import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserPrefModel } from '../../models/UserPrefModel';
import { HomePageCard } from './HomePageCard';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPref } from '../../slices/userPrefSlice';
import { loginApi } from '../../api/loginApi';

export const HomePage = () => {
  const { saveLogin } = loginApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPref = useSelector((state: any) => state.userPref.value);

  let defaultArea = userPref?.defaultArea;

  if (defaultArea != null) {
    defaultArea = defaultArea.toLowerCase();
  }

  const handleUndoDefaultClick = async () => {
    const updatedUserPref = { ...userPref, ['defaultArea']: '' };
    await saveUserPref(updatedUserPref);
  };

  const handleNavigateToLogShowsClick = () => {
    navigate('/shows');
  };

  const handleLogShowsSetAsDefault = async () => {
    const updatedUserPref = { ...userPref, ['defaultArea']: 'shows' };
    await saveUserPref(updatedUserPref);
  };

  const handleNavigateToLogBooksClick = () => {
    navigate('/books');
  };

  const handleLogBooksSetAsDefault = async () => {
    const updatedUserPref = { ...userPref, ['defaultArea']: 'books' };
    await saveUserPref(updatedUserPref);
  };

  const handleNavigateToInfoClick = () => {
    if (userPref && userPref.hasAdminRole) {
      navigate('/info');
    }
  };

  const handleNavigateToFriendsClick = () => {
    navigate('/friends');
  };

  // const handleNavigateToHelpClick = () => {
  //   navigate('/help');
  // };

  const saveUserPref = async (model: UserPrefModel) => {
    const updatedLogin = await saveLogin(model);

    if (updatedLogin != null) {
      dispatch(updateUserPref(model));
    }
  };

  // useEffect(() => {
  //   loadUserPref();
  // }, []);

  return (
    <Box
      sx={{
        width: '90vw',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          columnGap: '10px',
          rowGap: '10px',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: '1fr 1fr 1fr 1fr',
          },
        }}
      >
        <HomePageCard
          title="Log Shows"
          description="Track the shows and movies you watch on a daily basis. See what
              your friends are watching."
          navigateText="Track"
          onNavigateClick={handleNavigateToLogShowsClick}
          onSetDefaultAreaClick={handleLogShowsSetAsDefault}
          onUndoDefaultAreaClick={handleUndoDefaultClick}
          currentDefaultAreaIndc={defaultArea === 'shows'}
        />
        <HomePageCard
          title="Log Books"
          description="Track the books you are reading."
          navigateText="Track"
          onNavigateClick={handleNavigateToLogBooksClick}
          onSetDefaultAreaClick={handleLogBooksSetAsDefault}
          onUndoDefaultAreaClick={handleUndoDefaultClick}
          currentDefaultAreaIndc={defaultArea === 'books'}
        />
        <HomePageCard
          title="Friends"
          description="Manage your friends."
          navigateText="See Friends"
          onNavigateClick={handleNavigateToFriendsClick}
        />
        {/* <HomePageCard
          title="Help"
          description="Learn how to use the different trackers."
          navigateText="Help me!"
          onNavigateClick={handleNavigateToHelpClick}
        /> */}
        {userPref && userPref.hasAdminRole && (
          <HomePageCard
            title="Info"
            description="Manage the api data within the application."
            navigateText="See Info"
            onNavigateClick={handleNavigateToInfoClick}
          />
        )}
      </Box>
    </Box>
  );
};

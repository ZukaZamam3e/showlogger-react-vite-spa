import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetchOAProjectsAPI';
import { protectedResources } from '../../config/apiConfig';
import { UserPrefModel } from '../../models/UserPrefModel';
import { HomePageCard } from './HomePageCard';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../slices/isLoadingSlice';
import { showErrors } from '../../slices/errorsSlice';
import { updateUserPref } from '../../slices/userPrefSlice';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPref = useSelector((state: any) => state.userPref.value);

  const { getData, postData } = useFetch();

  console.log(userPref);

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
    navigate('/info');
  };

  const handleNavigateToFriendsClick = () => {
    navigate('/friends');
  };

  const saveUserPref = async (model: UserPrefModel) => {
    dispatch(startLoading());
    await postData(
      `${protectedResources.oaprojectsApi.loginEndpoint}/save`,
      model,
    )
      .then(async json => {
        if (json.errors.length == 0) {
          dispatch(updateUserPref(model));
        } else {
          dispatch(showErrors(json.errors));
        }
      })
      .catch(() => {})
      .finally(() => {
        dispatch(stopLoading());
      });
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
          currentDefaultAreaIndc={userPref?.defaultArea === 'shows'}
        />
        <HomePageCard
          title="Log Books"
          description="Track the books you are reading."
          navigateText="Track"
          onNavigateClick={handleNavigateToLogBooksClick}
          onSetDefaultAreaClick={handleLogBooksSetAsDefault}
          onUndoDefaultAreaClick={handleUndoDefaultClick}
          currentDefaultAreaIndc={userPref?.defaultArea === 'books'}
        />
        <HomePageCard
          title="Info"
          description="Manage the api data within the application."
          navigateText="See Info"
          onNavigateClick={handleNavigateToInfoClick}
        />
        <HomePageCard
          title="Friends"
          description="Manage your friends."
          navigateText="See Friends"
          onNavigateClick={handleNavigateToFriendsClick}
        />
      </Box>
    </Box>
  );
};

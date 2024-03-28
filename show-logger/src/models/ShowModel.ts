export interface ShowModel {
    showId: number;
    showName?: string;
    showTypeId?: number;
    showTypeIdZ?: string;
    seasonNumber?: number;
    episodeNumber?: number;
    dateWatched?: Date;
    showNotes?: string;
}

export const createNewShow = () => {
    let newShow: ShowModel = {
        showId: -1,
        dateWatched: new Date(),
        showTypeId: 1000,
        seasonNumber: 1,
        episodeNumber: 1,
    };

    return newShow;
}

export const getShowData = () => {
    let today = new Date();
    let shows: ShowModel[] = [
        {
            showId: 0,
            showName: "The Walking Dead: Daryl Dixon",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 1,
            episodeNumber: 4,
            dateWatched: today,
        },{
            showId: 1,
            showName: "Glee",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 2,
            episodeNumber: 21,
            dateWatched: today,
        },{
            showId: 2,
            showName: "Kitchen Nightmares",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 1,
            episodeNumber: 1,
            dateWatched: today,
        },{
            showId: 3,
            showName: "Glee",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 2,
            episodeNumber: 20,
            dateWatched: today,
        },{
            showId: 4,
            showName: "Master Chef",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 13,
            episodeNumber: 20,
            dateWatched: today,
        },{
            showId: 5,
            showName: "One Tree Hill",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 5,
            episodeNumber: 16,
            dateWatched: today,
        },{
            showId: 6,
            showName: "Master Chef",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 13,
            episodeNumber: 19,
            dateWatched: today,
        },{
            showId: 7,
            showName: "Master Chef",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 13,
            episodeNumber: 18,
            dateWatched: today,
        },{
            showId: 8,
            showName: "Glee",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 2,
            episodeNumber: 19,
            dateWatched: today,
        },{
            showId: 9,
            showName: "Parenthood",
            showTypeId: 1000,
            showTypeIdZ: "TV",
            seasonNumber: 3,
            episodeNumber: 14,
            dateWatched: today,
        }
    ];

    return shows;
}
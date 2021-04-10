import {InputsAdd} from "../components/teams/addNew/AddTeam";

export interface ISignIn {
    username: string,
    avatarUrl: string | null,
    token: string,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string | undefined
}

export type PagesFetch = {
    page: number;
    pageSize: number;
    token: string | null;
}

export type SendPhoto = {
    uploadingImage: File | undefined;
    collectedData: InputsAdd;
    token: string | null;
}

export type SendCard = {
    collectedData: InputsAdd;
    token: string | null;
}

export interface ITeamCard {
    name: string,
    foundationYear: number,
    division: string,
    conference: string,
    imageUrl: string,
    id: number
}

export interface ITeams {
    data: ITeamCard[],
    count: number,
    page: number,
    size: number,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string | undefined
}

type teamData = {
    name: string,
    foundationYear: 0,
    division: string,
    conference: string,
    imageUrl: string,
    id: 0
}

export interface IAddTeam {
    data: teamData,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string | undefined
}
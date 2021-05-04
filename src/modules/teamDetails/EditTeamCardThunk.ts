import {createAsyncThunk} from '@reduxjs/toolkit';
import {SendCard} from '../../core/redux/types/SendCard';
import {baseURL} from '../../api/BaseUrl';

export const editTeamCard = createAsyncThunk(
    'teamDetails/editTeamCard',
    async ({collectedData, token}: SendCard, thunkAPI) => {
        try {
            const response = await fetch(
                `${baseURL}/api/Team/Update`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(collectedData)
                }
            );
            let data = await response.json();

            if (response.status === 200) {
                return {...data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

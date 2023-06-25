import { createAction } from '@reduxjs/toolkit/dist/createAction';

export const redirectToRoute = createAction<string>('redirectToRoute');

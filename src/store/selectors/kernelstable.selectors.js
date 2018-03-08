// import { createSelector } from 'reselect';

export const isKernelsFetching = state => !!state.kernels.isFetching;
export const kernelsError = state => !!state.kernels.errorMessage;
export const getKernels = state => state.kernels.kernels;

// import { createSelector } from 'reselect';

export const isDatasetsFetching = state => !!state.datasets.isFetching;
export const datasetsError = state => !!state.datasets.errorMessage;
export const getDatasets = state => state.datasets.datasets;

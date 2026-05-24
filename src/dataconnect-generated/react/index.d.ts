import { CreateUserData, CreateUserVariables, GetMyProfileData, ListTopicsBySubjectData, ListTopicsBySubjectVariables, RecordUserAttemptData, RecordUserAttemptVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetMyProfile(options?: useDataConnectQueryOptions<GetMyProfileData>): UseDataConnectQueryResult<GetMyProfileData, undefined>;
export function useGetMyProfile(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyProfileData>): UseDataConnectQueryResult<GetMyProfileData, undefined>;

export function useListTopicsBySubject(vars: ListTopicsBySubjectVariables, options?: useDataConnectQueryOptions<ListTopicsBySubjectData>): UseDataConnectQueryResult<ListTopicsBySubjectData, ListTopicsBySubjectVariables>;
export function useListTopicsBySubject(dc: DataConnect, vars: ListTopicsBySubjectVariables, options?: useDataConnectQueryOptions<ListTopicsBySubjectData>): UseDataConnectQueryResult<ListTopicsBySubjectData, ListTopicsBySubjectVariables>;

export function useRecordUserAttempt(options?: useDataConnectMutationOptions<RecordUserAttemptData, FirebaseError, RecordUserAttemptVariables>): UseDataConnectMutationResult<RecordUserAttemptData, RecordUserAttemptVariables>;
export function useRecordUserAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<RecordUserAttemptData, FirebaseError, RecordUserAttemptVariables>): UseDataConnectMutationResult<RecordUserAttemptData, RecordUserAttemptVariables>;

import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
  email: string;
  passwordHash: string;
  displayName?: string | null;
  profilePictureUrl?: string | null;
}

export interface GetMyProfileData {
  user?: {
    id: UUIDString;
    username: string;
    email: string;
    displayName?: string | null;
    profilePictureUrl?: string | null;
    createdAt: TimestampString;
  } & User_Key;
}

export interface ListTopicsBySubjectData {
  topics: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    subject: {
      id: UUIDString;
      name: string;
    } & Subject_Key;
  } & Topic_Key)[];
}

export interface ListTopicsBySubjectVariables {
  subjectId: UUIDString;
}

export interface Question_Key {
  id: UUIDString;
  __typename?: 'Question_Key';
}

export interface RecordUserAttemptData {
  userAttempt_insert: UserAttempt_Key;
}

export interface RecordUserAttemptVariables {
  questionId: UUIDString;
  selectedOption: string;
  isCorrect: boolean;
}

export interface StudyMaterial_Key {
  id: UUIDString;
  __typename?: 'StudyMaterial_Key';
}

export interface Subject_Key {
  id: UUIDString;
  __typename?: 'Subject_Key';
}

export interface Topic_Key {
  id: UUIDString;
  __typename?: 'Topic_Key';
}

export interface UserAttempt_Key {
  id: UUIDString;
  __typename?: 'UserAttempt_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetMyProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyProfileData, undefined>;
  operationName: string;
}
export const getMyProfileRef: GetMyProfileRef;

export function getMyProfile(options?: ExecuteQueryOptions): QueryPromise<GetMyProfileData, undefined>;
export function getMyProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyProfileData, undefined>;

interface ListTopicsBySubjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTopicsBySubjectVariables): QueryRef<ListTopicsBySubjectData, ListTopicsBySubjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListTopicsBySubjectVariables): QueryRef<ListTopicsBySubjectData, ListTopicsBySubjectVariables>;
  operationName: string;
}
export const listTopicsBySubjectRef: ListTopicsBySubjectRef;

export function listTopicsBySubject(vars: ListTopicsBySubjectVariables, options?: ExecuteQueryOptions): QueryPromise<ListTopicsBySubjectData, ListTopicsBySubjectVariables>;
export function listTopicsBySubject(dc: DataConnect, vars: ListTopicsBySubjectVariables, options?: ExecuteQueryOptions): QueryPromise<ListTopicsBySubjectData, ListTopicsBySubjectVariables>;

interface RecordUserAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordUserAttemptVariables): MutationRef<RecordUserAttemptData, RecordUserAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordUserAttemptVariables): MutationRef<RecordUserAttemptData, RecordUserAttemptVariables>;
  operationName: string;
}
export const recordUserAttemptRef: RecordUserAttemptRef;

export function recordUserAttempt(vars: RecordUserAttemptVariables): MutationPromise<RecordUserAttemptData, RecordUserAttemptVariables>;
export function recordUserAttempt(dc: DataConnect, vars: RecordUserAttemptVariables): MutationPromise<RecordUserAttemptData, RecordUserAttemptVariables>;


import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Course = {
  __typename?: 'Course';
  category?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  instructor: Instructor;
  instructorId: Scalars['String'];
  promoImage?: Maybe<Scalars['String']>;
  promoVideo?: Maybe<Scalars['String']>;
  sectionOrder: Array<Scalars['String']>;
  sections?: Maybe<Array<Section>>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Instructor = {
  __typename?: 'Instructor';
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  instructorTitle?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type InstructorResponse = {
  __typename?: 'InstructorResponse';
  errors?: Maybe<Array<FieldError>>;
  instructor?: Maybe<Instructor>;
};

export type Lesson = {
  __typename?: 'Lesson';
  articleText?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  isArticle?: Maybe<Scalars['Boolean']>;
  section?: Maybe<Section>;
  sectionId: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  videoEmbedUrl?: Maybe<Scalars['String']>;
  videoState?: Maybe<Scalars['String']>;
  videoUri?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeLessonOrderDifferentSection: OrderedLessonsInMultipleSections;
  changeLessonOrderSameSection: Section;
  changeLessonTitle: Lesson;
  changePassword: InstructorResponse;
  changeSectionOrder: Course;
  changeSectionTitle: Section;
  createCourse: Course;
  createLesson: Scalars['Boolean'];
  createSection: Scalars['Boolean'];
  deleteCourse: Scalars['Boolean'];
  deleteLesson: Scalars['Boolean'];
  deleteSection: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: InstructorResponse;
  logout: Scalars['Boolean'];
  register: InstructorResponse;
  setArticleText: Lesson;
  setVideoUrl: Lesson;
  updateCourse?: Maybe<Course>;
};


export type MutationChangeLessonOrderDifferentSectionArgs = {
  currentLessonId: Scalars['String'];
  currentLessonOrder: Array<Scalars['String']>;
  currentSectionId: Scalars['String'];
  nextLessonOrder: Array<Scalars['String']>;
  nextSectionId: Scalars['String'];
};


export type MutationChangeLessonOrderSameSectionArgs = {
  lessonOrder: Array<Scalars['String']>;
  sectionId: Scalars['String'];
};


export type MutationChangeLessonTitleArgs = {
  lessonId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangeSectionOrderArgs = {
  courseId: Scalars['String'];
  sectionOrder: Array<Scalars['String']>;
};


export type MutationChangeSectionTitleArgs = {
  sectionId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateCourseArgs = {
  title: Scalars['String'];
};


export type MutationCreateLessonArgs = {
  lessonId: Scalars['String'];
  lessonOrder: Array<Scalars['String']>;
  sectionId: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateSectionArgs = {
  courseId: Scalars['String'];
  sectionId: Scalars['String'];
  sectionOrder: Array<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLessonArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSectionArgs = {
  courseId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationSetArticleTextArgs = {
  articleText: Scalars['String'];
  lessonId: Scalars['String'];
};


export type MutationSetVideoUrlArgs = {
  lessonId: Scalars['String'];
  videoEmbedUrl: Scalars['String'];
  videoUri: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  id: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type OrderedLessonsInMultipleSections = {
  __typename?: 'OrderedLessonsInMultipleSections';
  currentLesson: Lesson;
  currentSection: Section;
  nextSection: Section;
};

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  count: Scalars['Float'];
  courses: Array<Course>;
};

export type Query = {
  __typename?: 'Query';
  course?: Maybe<Course>;
  courses: PaginatedCourses;
  hellodude: Scalars['String'];
  instructorCourse: Array<Course>;
  instructorCourses: Array<Course>;
  lesson?: Maybe<Lesson>;
  me?: Maybe<Instructor>;
};


export type QueryCourseArgs = {
  id: Scalars['String'];
};


export type QueryCoursesArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryInstructorCourseArgs = {
  courseId: Scalars['String'];
};


export type QueryLessonArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Section = {
  __typename?: 'Section';
  course?: Maybe<Course>;
  courseId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  lessonOrder: Array<Scalars['String']>;
  lessons?: Maybe<Array<Lesson>>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type InstructorFragmentFragment = { __typename?: 'Instructor', id: string, email: string, createdAt: string, updatedAt: string };

export type ChangeLessonOrderDifferentSectionMutationVariables = Exact<{
  nextLessonOrder: Array<Scalars['String']> | Scalars['String'];
  currentLessonOrder: Array<Scalars['String']> | Scalars['String'];
  currentLessonId: Scalars['String'];
  currentSectionId: Scalars['String'];
  nextSectionId: Scalars['String'];
}>;


export type ChangeLessonOrderDifferentSectionMutation = { __typename?: 'Mutation', changeLessonOrderDifferentSection: { __typename?: 'OrderedLessonsInMultipleSections', nextSection: { __typename?: 'Section', id: string, lessonOrder: Array<string>, lessons?: Array<{ __typename?: 'Lesson', id: string, title: string }> | null }, currentSection: { __typename?: 'Section', id: string, lessonOrder: Array<string> }, currentLesson: { __typename?: 'Lesson', id: string, sectionId: string, title: string } } };

export type ChangeLessonOrderSameSectionMutationVariables = Exact<{
  lessonOrder: Array<Scalars['String']> | Scalars['String'];
  sectionId: Scalars['String'];
}>;


export type ChangeLessonOrderSameSectionMutation = { __typename?: 'Mutation', changeLessonOrderSameSection: { __typename?: 'Section', id: string, lessonOrder: Array<string> } };

export type ChangeLessonTitleMutationVariables = Exact<{
  title: Scalars['String'];
  lessonId: Scalars['String'];
}>;


export type ChangeLessonTitleMutation = { __typename?: 'Mutation', changeLessonTitle: { __typename?: 'Lesson', id: string, title: string } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'InstructorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, instructor?: { __typename?: 'Instructor', id: string, createdAt: string, updatedAt: string, email: string, firstName: string, lastName: string } | null } };

export type ChangeSectionOrderMutationVariables = Exact<{
  sectionOrder: Array<Scalars['String']> | Scalars['String'];
  courseId: Scalars['String'];
}>;


export type ChangeSectionOrderMutation = { __typename?: 'Mutation', changeSectionOrder: { __typename?: 'Course', id: string, sectionOrder: Array<string> } };

export type ChangeSectionTitleMutationVariables = Exact<{
  title: Scalars['String'];
  sectionId: Scalars['String'];
}>;


export type ChangeSectionTitleMutation = { __typename?: 'Mutation', changeSectionTitle: { __typename?: 'Section', id: string, title: string } };

export type CreateCourseMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, instructorId: string, category?: string | null, promoVideo?: string | null, promoImage?: string | null, tags: Array<string> } };

export type CreateLessonMutationVariables = Exact<{
  lessonOrder: Array<Scalars['String']> | Scalars['String'];
  lessonId: Scalars['String'];
  sectionId: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: boolean };

export type CreateSectionMutationVariables = Exact<{
  sectionOrder: Array<Scalars['String']> | Scalars['String'];
  courseId: Scalars['String'];
  sectionId: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateSectionMutation = { __typename?: 'Mutation', createSection: boolean };

export type DeleteLessonMutationVariables = Exact<{
  deleteLessonId: Scalars['String'];
}>;


export type DeleteLessonMutation = { __typename?: 'Mutation', deleteLesson: boolean };

export type DeleteSectionMutationVariables = Exact<{
  courseId: Scalars['String'];
  deleteSectionId: Scalars['String'];
}>;


export type DeleteSectionMutation = { __typename?: 'Mutation', deleteSection: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'InstructorResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, instructor?: { __typename?: 'Instructor', email: string, createdAt: string, updatedAt: string, id: string, firstName: string, lastName: string, instructorTitle?: string | null, description?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'InstructorResponse', instructor?: { __typename?: 'Instructor', email: string, createdAt: string, updatedAt: string, id: string, firstName: string, lastName: string, instructorTitle?: string | null, description?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type SetArticleTextMutationVariables = Exact<{
  articleText: Scalars['String'];
  lessonId: Scalars['String'];
}>;


export type SetArticleTextMutation = { __typename?: 'Mutation', setArticleText: { __typename?: 'Lesson', id: string, articleText?: string | null } };

export type SetVideoUrlMutationVariables = Exact<{
  videoUri: Scalars['String'];
  videoEmbedUrl: Scalars['String'];
  lessonId: Scalars['String'];
}>;


export type SetVideoUrlMutation = { __typename?: 'Mutation', setVideoUrl: { __typename?: 'Lesson', videoEmbedUrl?: string | null, videoUri?: string | null, id: string } };

export type PaginatedCoursesQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type PaginatedCoursesQuery = { __typename?: 'Query', courses: { __typename?: 'PaginatedCourses', count: number, courses: Array<{ __typename?: 'Course', id: string, createdAt: string, updatedAt: string, title: string, instructorId: string, description?: string | null, category?: string | null, promoVideo?: string | null, promoImage?: string | null, tags: Array<string>, instructor: { __typename?: 'Instructor', id: string, firstName: string, lastName: string, instructorTitle?: string | null, description?: string | null, email: string, createdAt: string, updatedAt: string } }> } };

export type GetLessonQueryVariables = Exact<{
  lessonId: Scalars['String'];
}>;


export type GetLessonQuery = { __typename?: 'Query', lesson?: { __typename?: 'Lesson', id: string, articleText?: string | null } | null };

export type InstructorCourseQueryVariables = Exact<{
  courseId: Scalars['String'];
}>;


export type InstructorCourseQuery = { __typename?: 'Query', course?: { __typename?: 'Course', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, category?: string | null, promoVideo?: string | null, promoImage?: string | null, instructorId: string, tags: Array<string>, sectionOrder: Array<string>, sections?: Array<{ __typename?: 'Section', id: string, title: string, courseId: string, createdAt: string, updatedAt: string, lessonOrder: Array<string>, lessons?: Array<{ __typename?: 'Lesson', id: string, createdAt: string, updatedAt: string, title: string, sectionId: string, videoUri?: string | null, videoEmbedUrl?: string | null, isArticle?: boolean | null }> | null }> | null } | null };

export type InstructorCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type InstructorCoursesQuery = { __typename?: 'Query', instructorCourses: Array<{ __typename?: 'Course', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null, instructorId: string, category?: string | null, promoVideo?: string | null, promoImage?: string | null, tags: Array<string> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Instructor', id: string, createdAt: string, updatedAt: string, email: string, firstName: string, lastName: string } | null };

export const InstructorFragmentFragmentDoc = gql`
    fragment InstructorFragment on Instructor {
  id
  email
  createdAt
  updatedAt
}
    `;
export const ChangeLessonOrderDifferentSectionDocument = gql`
    mutation ChangeLessonOrderDifferentSection($nextLessonOrder: [String!]!, $currentLessonOrder: [String!]!, $currentLessonId: String!, $currentSectionId: String!, $nextSectionId: String!) {
  changeLessonOrderDifferentSection(
    nextLessonOrder: $nextLessonOrder
    currentLessonOrder: $currentLessonOrder
    currentLessonId: $currentLessonId
    currentSectionId: $currentSectionId
    nextSectionId: $nextSectionId
  ) {
    nextSection {
      id
      lessonOrder
      lessons {
        id
        title
      }
    }
    currentSection {
      id
      lessonOrder
    }
    currentLesson {
      id
      sectionId
      title
    }
  }
}
    `;
export type ChangeLessonOrderDifferentSectionMutationFn = Apollo.MutationFunction<ChangeLessonOrderDifferentSectionMutation, ChangeLessonOrderDifferentSectionMutationVariables>;

/**
 * __useChangeLessonOrderDifferentSectionMutation__
 *
 * To run a mutation, you first call `useChangeLessonOrderDifferentSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLessonOrderDifferentSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLessonOrderDifferentSectionMutation, { data, loading, error }] = useChangeLessonOrderDifferentSectionMutation({
 *   variables: {
 *      nextLessonOrder: // value for 'nextLessonOrder'
 *      currentLessonOrder: // value for 'currentLessonOrder'
 *      currentLessonId: // value for 'currentLessonId'
 *      currentSectionId: // value for 'currentSectionId'
 *      nextSectionId: // value for 'nextSectionId'
 *   },
 * });
 */
export function useChangeLessonOrderDifferentSectionMutation(baseOptions?: Apollo.MutationHookOptions<ChangeLessonOrderDifferentSectionMutation, ChangeLessonOrderDifferentSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeLessonOrderDifferentSectionMutation, ChangeLessonOrderDifferentSectionMutationVariables>(ChangeLessonOrderDifferentSectionDocument, options);
      }
export type ChangeLessonOrderDifferentSectionMutationHookResult = ReturnType<typeof useChangeLessonOrderDifferentSectionMutation>;
export type ChangeLessonOrderDifferentSectionMutationResult = Apollo.MutationResult<ChangeLessonOrderDifferentSectionMutation>;
export type ChangeLessonOrderDifferentSectionMutationOptions = Apollo.BaseMutationOptions<ChangeLessonOrderDifferentSectionMutation, ChangeLessonOrderDifferentSectionMutationVariables>;
export const ChangeLessonOrderSameSectionDocument = gql`
    mutation changeLessonOrderSameSection($lessonOrder: [String!]!, $sectionId: String!) {
  changeLessonOrderSameSection(lessonOrder: $lessonOrder, sectionId: $sectionId) {
    id
    lessonOrder
  }
}
    `;
export type ChangeLessonOrderSameSectionMutationFn = Apollo.MutationFunction<ChangeLessonOrderSameSectionMutation, ChangeLessonOrderSameSectionMutationVariables>;

/**
 * __useChangeLessonOrderSameSectionMutation__
 *
 * To run a mutation, you first call `useChangeLessonOrderSameSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLessonOrderSameSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLessonOrderSameSectionMutation, { data, loading, error }] = useChangeLessonOrderSameSectionMutation({
 *   variables: {
 *      lessonOrder: // value for 'lessonOrder'
 *      sectionId: // value for 'sectionId'
 *   },
 * });
 */
export function useChangeLessonOrderSameSectionMutation(baseOptions?: Apollo.MutationHookOptions<ChangeLessonOrderSameSectionMutation, ChangeLessonOrderSameSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeLessonOrderSameSectionMutation, ChangeLessonOrderSameSectionMutationVariables>(ChangeLessonOrderSameSectionDocument, options);
      }
export type ChangeLessonOrderSameSectionMutationHookResult = ReturnType<typeof useChangeLessonOrderSameSectionMutation>;
export type ChangeLessonOrderSameSectionMutationResult = Apollo.MutationResult<ChangeLessonOrderSameSectionMutation>;
export type ChangeLessonOrderSameSectionMutationOptions = Apollo.BaseMutationOptions<ChangeLessonOrderSameSectionMutation, ChangeLessonOrderSameSectionMutationVariables>;
export const ChangeLessonTitleDocument = gql`
    mutation ChangeLessonTitle($title: String!, $lessonId: String!) {
  changeLessonTitle(title: $title, lessonId: $lessonId) {
    id
    title
  }
}
    `;
export type ChangeLessonTitleMutationFn = Apollo.MutationFunction<ChangeLessonTitleMutation, ChangeLessonTitleMutationVariables>;

/**
 * __useChangeLessonTitleMutation__
 *
 * To run a mutation, you first call `useChangeLessonTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLessonTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLessonTitleMutation, { data, loading, error }] = useChangeLessonTitleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useChangeLessonTitleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeLessonTitleMutation, ChangeLessonTitleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeLessonTitleMutation, ChangeLessonTitleMutationVariables>(ChangeLessonTitleDocument, options);
      }
export type ChangeLessonTitleMutationHookResult = ReturnType<typeof useChangeLessonTitleMutation>;
export type ChangeLessonTitleMutationResult = Apollo.MutationResult<ChangeLessonTitleMutation>;
export type ChangeLessonTitleMutationOptions = Apollo.BaseMutationOptions<ChangeLessonTitleMutation, ChangeLessonTitleMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    errors {
      field
      message
    }
    instructor {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeSectionOrderDocument = gql`
    mutation ChangeSectionOrder($sectionOrder: [String!]!, $courseId: String!) {
  changeSectionOrder(sectionOrder: $sectionOrder, courseId: $courseId) {
    id
    sectionOrder
  }
}
    `;
export type ChangeSectionOrderMutationFn = Apollo.MutationFunction<ChangeSectionOrderMutation, ChangeSectionOrderMutationVariables>;

/**
 * __useChangeSectionOrderMutation__
 *
 * To run a mutation, you first call `useChangeSectionOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSectionOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSectionOrderMutation, { data, loading, error }] = useChangeSectionOrderMutation({
 *   variables: {
 *      sectionOrder: // value for 'sectionOrder'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useChangeSectionOrderMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSectionOrderMutation, ChangeSectionOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSectionOrderMutation, ChangeSectionOrderMutationVariables>(ChangeSectionOrderDocument, options);
      }
export type ChangeSectionOrderMutationHookResult = ReturnType<typeof useChangeSectionOrderMutation>;
export type ChangeSectionOrderMutationResult = Apollo.MutationResult<ChangeSectionOrderMutation>;
export type ChangeSectionOrderMutationOptions = Apollo.BaseMutationOptions<ChangeSectionOrderMutation, ChangeSectionOrderMutationVariables>;
export const ChangeSectionTitleDocument = gql`
    mutation ChangeSectionTitle($title: String!, $sectionId: String!) {
  changeSectionTitle(title: $title, sectionId: $sectionId) {
    id
    title
  }
}
    `;
export type ChangeSectionTitleMutationFn = Apollo.MutationFunction<ChangeSectionTitleMutation, ChangeSectionTitleMutationVariables>;

/**
 * __useChangeSectionTitleMutation__
 *
 * To run a mutation, you first call `useChangeSectionTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeSectionTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeSectionTitleMutation, { data, loading, error }] = useChangeSectionTitleMutation({
 *   variables: {
 *      title: // value for 'title'
 *      sectionId: // value for 'sectionId'
 *   },
 * });
 */
export function useChangeSectionTitleMutation(baseOptions?: Apollo.MutationHookOptions<ChangeSectionTitleMutation, ChangeSectionTitleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeSectionTitleMutation, ChangeSectionTitleMutationVariables>(ChangeSectionTitleDocument, options);
      }
export type ChangeSectionTitleMutationHookResult = ReturnType<typeof useChangeSectionTitleMutation>;
export type ChangeSectionTitleMutationResult = Apollo.MutationResult<ChangeSectionTitleMutation>;
export type ChangeSectionTitleMutationOptions = Apollo.BaseMutationOptions<ChangeSectionTitleMutation, ChangeSectionTitleMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($title: String!) {
  createCourse(title: $title) {
    id
    createdAt
    updatedAt
    title
    description
    instructorId
    category
    promoVideo
    promoImage
    tags
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const CreateLessonDocument = gql`
    mutation CreateLesson($lessonOrder: [String!]!, $lessonId: String!, $sectionId: String!, $title: String!) {
  createLesson(
    lessonOrder: $lessonOrder
    lessonId: $lessonId
    sectionId: $sectionId
    title: $title
  )
}
    `;
export type CreateLessonMutationFn = Apollo.MutationFunction<CreateLessonMutation, CreateLessonMutationVariables>;

/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      lessonOrder: // value for 'lessonOrder'
 *      lessonId: // value for 'lessonId'
 *      sectionId: // value for 'sectionId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateLessonMutation(baseOptions?: Apollo.MutationHookOptions<CreateLessonMutation, CreateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLessonMutation, CreateLessonMutationVariables>(CreateLessonDocument, options);
      }
export type CreateLessonMutationHookResult = ReturnType<typeof useCreateLessonMutation>;
export type CreateLessonMutationResult = Apollo.MutationResult<CreateLessonMutation>;
export type CreateLessonMutationOptions = Apollo.BaseMutationOptions<CreateLessonMutation, CreateLessonMutationVariables>;
export const CreateSectionDocument = gql`
    mutation CreateSection($sectionOrder: [String!]!, $courseId: String!, $sectionId: String!, $title: String!) {
  createSection(
    sectionOrder: $sectionOrder
    courseId: $courseId
    sectionId: $sectionId
    title: $title
  )
}
    `;
export type CreateSectionMutationFn = Apollo.MutationFunction<CreateSectionMutation, CreateSectionMutationVariables>;

/**
 * __useCreateSectionMutation__
 *
 * To run a mutation, you first call `useCreateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSectionMutation, { data, loading, error }] = useCreateSectionMutation({
 *   variables: {
 *      sectionOrder: // value for 'sectionOrder'
 *      courseId: // value for 'courseId'
 *      sectionId: // value for 'sectionId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateSectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSectionMutation, CreateSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSectionMutation, CreateSectionMutationVariables>(CreateSectionDocument, options);
      }
export type CreateSectionMutationHookResult = ReturnType<typeof useCreateSectionMutation>;
export type CreateSectionMutationResult = Apollo.MutationResult<CreateSectionMutation>;
export type CreateSectionMutationOptions = Apollo.BaseMutationOptions<CreateSectionMutation, CreateSectionMutationVariables>;
export const DeleteLessonDocument = gql`
    mutation DeleteLesson($deleteLessonId: String!) {
  deleteLesson(id: $deleteLessonId)
}
    `;
export type DeleteLessonMutationFn = Apollo.MutationFunction<DeleteLessonMutation, DeleteLessonMutationVariables>;

/**
 * __useDeleteLessonMutation__
 *
 * To run a mutation, you first call `useDeleteLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLessonMutation, { data, loading, error }] = useDeleteLessonMutation({
 *   variables: {
 *      deleteLessonId: // value for 'deleteLessonId'
 *   },
 * });
 */
export function useDeleteLessonMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLessonMutation, DeleteLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLessonMutation, DeleteLessonMutationVariables>(DeleteLessonDocument, options);
      }
export type DeleteLessonMutationHookResult = ReturnType<typeof useDeleteLessonMutation>;
export type DeleteLessonMutationResult = Apollo.MutationResult<DeleteLessonMutation>;
export type DeleteLessonMutationOptions = Apollo.BaseMutationOptions<DeleteLessonMutation, DeleteLessonMutationVariables>;
export const DeleteSectionDocument = gql`
    mutation DeleteSection($courseId: String!, $deleteSectionId: String!) {
  deleteSection(courseId: $courseId, id: $deleteSectionId)
}
    `;
export type DeleteSectionMutationFn = Apollo.MutationFunction<DeleteSectionMutation, DeleteSectionMutationVariables>;

/**
 * __useDeleteSectionMutation__
 *
 * To run a mutation, you first call `useDeleteSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSectionMutation, { data, loading, error }] = useDeleteSectionMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      deleteSectionId: // value for 'deleteSectionId'
 *   },
 * });
 */
export function useDeleteSectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSectionMutation, DeleteSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSectionMutation, DeleteSectionMutationVariables>(DeleteSectionDocument, options);
      }
export type DeleteSectionMutationHookResult = ReturnType<typeof useDeleteSectionMutation>;
export type DeleteSectionMutationResult = Apollo.MutationResult<DeleteSectionMutation>;
export type DeleteSectionMutationOptions = Apollo.BaseMutationOptions<DeleteSectionMutation, DeleteSectionMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    instructor {
      email
      createdAt
      updatedAt
      id
      firstName
      lastName
      instructorTitle
      description
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    instructor {
      email
      createdAt
      updatedAt
      id
      firstName
      lastName
      instructorTitle
      description
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetArticleTextDocument = gql`
    mutation SetArticleText($articleText: String!, $lessonId: String!) {
  setArticleText(articleText: $articleText, lessonId: $lessonId) {
    id
    articleText
  }
}
    `;
export type SetArticleTextMutationFn = Apollo.MutationFunction<SetArticleTextMutation, SetArticleTextMutationVariables>;

/**
 * __useSetArticleTextMutation__
 *
 * To run a mutation, you first call `useSetArticleTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetArticleTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setArticleTextMutation, { data, loading, error }] = useSetArticleTextMutation({
 *   variables: {
 *      articleText: // value for 'articleText'
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useSetArticleTextMutation(baseOptions?: Apollo.MutationHookOptions<SetArticleTextMutation, SetArticleTextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetArticleTextMutation, SetArticleTextMutationVariables>(SetArticleTextDocument, options);
      }
export type SetArticleTextMutationHookResult = ReturnType<typeof useSetArticleTextMutation>;
export type SetArticleTextMutationResult = Apollo.MutationResult<SetArticleTextMutation>;
export type SetArticleTextMutationOptions = Apollo.BaseMutationOptions<SetArticleTextMutation, SetArticleTextMutationVariables>;
export const SetVideoUrlDocument = gql`
    mutation SetVideoUrl($videoUri: String!, $videoEmbedUrl: String!, $lessonId: String!) {
  setVideoUrl(
    videoUri: $videoUri
    videoEmbedUrl: $videoEmbedUrl
    lessonId: $lessonId
  ) {
    videoEmbedUrl
    videoUri
    id
  }
}
    `;
export type SetVideoUrlMutationFn = Apollo.MutationFunction<SetVideoUrlMutation, SetVideoUrlMutationVariables>;

/**
 * __useSetVideoUrlMutation__
 *
 * To run a mutation, you first call `useSetVideoUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetVideoUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setVideoUrlMutation, { data, loading, error }] = useSetVideoUrlMutation({
 *   variables: {
 *      videoUri: // value for 'videoUri'
 *      videoEmbedUrl: // value for 'videoEmbedUrl'
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useSetVideoUrlMutation(baseOptions?: Apollo.MutationHookOptions<SetVideoUrlMutation, SetVideoUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetVideoUrlMutation, SetVideoUrlMutationVariables>(SetVideoUrlDocument, options);
      }
export type SetVideoUrlMutationHookResult = ReturnType<typeof useSetVideoUrlMutation>;
export type SetVideoUrlMutationResult = Apollo.MutationResult<SetVideoUrlMutation>;
export type SetVideoUrlMutationOptions = Apollo.BaseMutationOptions<SetVideoUrlMutation, SetVideoUrlMutationVariables>;
export const PaginatedCoursesDocument = gql`
    query PaginatedCourses($offset: Int!, $limit: Int!) {
  courses(offset: $offset, limit: $limit) {
    courses {
      id
      createdAt
      updatedAt
      title
      instructorId
      description
      instructor {
        id
        firstName
        lastName
        instructorTitle
        description
        email
        createdAt
        updatedAt
      }
      category
      promoVideo
      promoImage
      tags
    }
    count
  }
}
    `;

/**
 * __usePaginatedCoursesQuery__
 *
 * To run a query within a React component, call `usePaginatedCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatedCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatedCoursesQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePaginatedCoursesQuery(baseOptions: Apollo.QueryHookOptions<PaginatedCoursesQuery, PaginatedCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatedCoursesQuery, PaginatedCoursesQueryVariables>(PaginatedCoursesDocument, options);
      }
export function usePaginatedCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatedCoursesQuery, PaginatedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatedCoursesQuery, PaginatedCoursesQueryVariables>(PaginatedCoursesDocument, options);
        }
export type PaginatedCoursesQueryHookResult = ReturnType<typeof usePaginatedCoursesQuery>;
export type PaginatedCoursesLazyQueryHookResult = ReturnType<typeof usePaginatedCoursesLazyQuery>;
export type PaginatedCoursesQueryResult = Apollo.QueryResult<PaginatedCoursesQuery, PaginatedCoursesQueryVariables>;
export const GetLessonDocument = gql`
    query GetLesson($lessonId: String!) {
  lesson(id: $lessonId) {
    id
    articleText
  }
}
    `;

/**
 * __useGetLessonQuery__
 *
 * To run a query within a React component, call `useGetLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonQuery({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useGetLessonQuery(baseOptions: Apollo.QueryHookOptions<GetLessonQuery, GetLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLessonQuery, GetLessonQueryVariables>(GetLessonDocument, options);
      }
export function useGetLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLessonQuery, GetLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLessonQuery, GetLessonQueryVariables>(GetLessonDocument, options);
        }
export type GetLessonQueryHookResult = ReturnType<typeof useGetLessonQuery>;
export type GetLessonLazyQueryHookResult = ReturnType<typeof useGetLessonLazyQuery>;
export type GetLessonQueryResult = Apollo.QueryResult<GetLessonQuery, GetLessonQueryVariables>;
export const InstructorCourseDocument = gql`
    query InstructorCourse($courseId: String!) {
  course(id: $courseId) {
    id
    createdAt
    updatedAt
    title
    description
    sections {
      id
      title
      courseId
      createdAt
      updatedAt
      lessonOrder
      lessons {
        id
        createdAt
        updatedAt
        title
        sectionId
        videoUri
        videoEmbedUrl
        isArticle
      }
    }
    category
    promoVideo
    promoImage
    instructorId
    tags
    sectionOrder
  }
}
    `;

/**
 * __useInstructorCourseQuery__
 *
 * To run a query within a React component, call `useInstructorCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstructorCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstructorCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useInstructorCourseQuery(baseOptions: Apollo.QueryHookOptions<InstructorCourseQuery, InstructorCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstructorCourseQuery, InstructorCourseQueryVariables>(InstructorCourseDocument, options);
      }
export function useInstructorCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstructorCourseQuery, InstructorCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstructorCourseQuery, InstructorCourseQueryVariables>(InstructorCourseDocument, options);
        }
export type InstructorCourseQueryHookResult = ReturnType<typeof useInstructorCourseQuery>;
export type InstructorCourseLazyQueryHookResult = ReturnType<typeof useInstructorCourseLazyQuery>;
export type InstructorCourseQueryResult = Apollo.QueryResult<InstructorCourseQuery, InstructorCourseQueryVariables>;
export const InstructorCoursesDocument = gql`
    query InstructorCourses {
  instructorCourses {
    id
    createdAt
    updatedAt
    title
    description
    instructorId
    category
    promoVideo
    promoImage
    tags
  }
}
    `;

/**
 * __useInstructorCoursesQuery__
 *
 * To run a query within a React component, call `useInstructorCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstructorCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstructorCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstructorCoursesQuery(baseOptions?: Apollo.QueryHookOptions<InstructorCoursesQuery, InstructorCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstructorCoursesQuery, InstructorCoursesQueryVariables>(InstructorCoursesDocument, options);
      }
export function useInstructorCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstructorCoursesQuery, InstructorCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstructorCoursesQuery, InstructorCoursesQueryVariables>(InstructorCoursesDocument, options);
        }
export type InstructorCoursesQueryHookResult = ReturnType<typeof useInstructorCoursesQuery>;
export type InstructorCoursesLazyQueryHookResult = ReturnType<typeof useInstructorCoursesLazyQuery>;
export type InstructorCoursesQueryResult = Apollo.QueryResult<InstructorCoursesQuery, InstructorCoursesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    createdAt
    updatedAt
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
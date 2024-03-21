import MaskedView from '@react-native-community/masked-view'
import { request, gql } from 'graphql-request'
const MASTER_URL="https://api-ap-south-1.hygraph.com/v2/cltoa3e5d0jqc07uqqch6m6ek/master"

export const getCourseList=async(level)=>{
    const query=gql`
    query CourseList {
      courses(where: {level: `+level+`}) {
        id
        name
        price
        level
        tags
        time
        author
        banner {
          url
        }
        description {
          markdown
        }
        chapters {
          title
          id
          content {
            heading
            description {
              markdown
              html
            }
            output {
              markdown
              html
            }
            video{
              url
            }
          }
        }
      }
    }
    
      `

      try {
        const result = await request(MASTER_URL, query)
        return result
    } catch (error) {
        console.error('Error fetching course list:', error)
        return { error: 'Error fetching course list' }
    }
}

export const enrollCourse=async(courseId,userEmail)=>{
  const mutationQuery=gql`
  mutation MyMutation {
    createUserEnrolledCourse(
      data: {courseId: "`+courseId+`", userEmail: "`+userEmail+`", course: {connect: {id: "`+courseId+`"}}}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
  `
  
  try {
    const result = await request(MASTER_URL, mutationQuery, { courseId, userEmail });
    return result;
} catch (error) {
    console.error('Error enrolling in course:', error);
    return { error: 'Error enrolling in course' };
}
}

export const getUserEnrolledCourse=async(courseId,userEmail)=>{
  const Userquery=gql`
  query GetUserEnrolledCourse {
    userEnrolledCourses(
      where: {courseId: "`+courseId+`", userEmail: "`+userEmail+`"}
    ) {
      courseId
      id
      completedChapter {
        chapterId
      }
    }
  }
  `
  try {
    const result = await request(MASTER_URL, Userquery);
    return result;
} catch (error) {
    console.error('Error getting user details', error);
    return { error: 'Error getting user detais' };
}
}


export const MarkChapterCompleted=async(chapterId,recordId,userEmail,points)=>{
  const mutationquery=gql`
  mutation markChapterCompleted {
    updateUserEnrolledCourse(
      data: {completedChapter: {create: {data: {chapterId: "`+chapterId+`"}}}}
      where: {id: "`+recordId+`"}
    ) {
      id
    }
    publishManyUserEnrolledCoursesConnection {
      edges {
        node {
          id
        }
      }
    }

    updateUserDetail(where:{email:"`+userEmail+`"},
    data:{point:`+points+`}){
      point
    }
    publishUserDetail(where:{email:"`+userEmail+`"}){
      id
    }
  }
  `
  try {
    const result = await request(MASTER_URL, mutationquery);
    return result;
  } catch (error) {
    console.error('Error marking completed chapter', error);
    return { error: 'Error marking completed chapter' };
  }
}

export const createNewUser=async(userName,email,profileImageUrl)=>{
  const createMutationQuery=gql`
  mutation CreateNewUser {
    upsertUserDetail(
      upsert: {create: 
      {email: "`+email+`", 
      userName: "`+userName+`", 
      point: 10, 
      profileImage: "`+profileImageUrl+`"}, 
      update: {email: "`+email+`",
      profileImage:"`+profileImageUrl+`",
      userName:"abc"}}
      where: {email: "`+email+`"}
    ) {
      id
    }
    publishUserDetail(where: {email: "`+email+`"}) {
      id
    }
  }
  `
  try {
    const result = await request(MASTER_URL, createMutationQuery);
    return result;
  } catch (error) {
    console.error('Error creating new user ', error);
    return { error: 'Error creating new user' };
  }
}

export const getUserDetail=async(email)=>{
  const getquery=gql`
  query getUserDetails{
    userDetail(where:
      {email:"`+email+`"}){
        point
      }
  }
  `

  const result=await request(MASTER_URL,getquery)
  return result
}


export const GetAllProgressCourse=async(userEmail)=>{
  const query=gql`
  query GetAllUserEnrolledProgressCourse {
    userEnrolledCourses(where: {userEmail: "`+userEmail+`"}) {
      completedChapter {
        chapterId
      }
      course {
        banner {
          url
        }
        chapters {
          id
          title
          content{
            heading
            description{
              markdown
              html
            }
            output{
              markdown
              html
            }
          }
        }
        description {
          markdown
        }
        id
        level
        name
        price
        time
      }
    }
  }
  `
  const result=await request(MASTER_URL,query)
  return result
}
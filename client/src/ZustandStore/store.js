import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const useCoursesStore = create(
  persist(
    (set, get) => ({
      //access_token
      access_token: null,

      currentUser: null,

      //  Products contains the owned courses
      Products: [],
      //  Courses contains all the courses
      userCourses: [],
      Courses: [],
      addProduct: (product) => {
        set((state) => ({ Courses: [...state.Courses, product] }));
      },
      setUserCourses: (usercourses) => {
        set((state) => ({ userCourses: usercourses }));
      },
      setToken: (token) => {
        set(() => ({ access_token: token }));
      },
      setCurrentUser: (currentUser) => {
        set(() => ({ currentUser: currentUser }));
      },
      deleteCourse: (id) => {
        set(() => ({
          Courses: get().Courses.filter((el) => el.id !== id),
        }));
      },

      removeAllBears: () => set({ Products: 0 }),
    }),
    {
      name: 'defaultstorage', // unique name
      // (optional) by default, 'localStorage' is used
    }
  )
);
export default useCoursesStore;

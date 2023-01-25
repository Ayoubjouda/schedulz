import { create } from "zustand";

const useProductStore = create((set, get) => ({
  //  Products contains the owned courses
  Products: [],
  //  Courses contains all the courses

  Courses: [
    {
      id: 0,

      title: "100 Days of Code: The Complete Python Pro Bootcamp for 2023 ",
      subTitle:
        "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
      price: "45",
      image: "https://blog.boot.dev/img/800/Best-Ways-To-Learn-Python-min.webp",
      content: [
        "Learn Machine Learning with Python",
        "Use Python to process: Images, CSVs, PDFs, and other files",
        "Learn how to use Python in web development",
      ],
    },
    {
      id: 1,

      title: "Learning to Meditate [Productivity & Focus]",

      subTitle:
        "Learn to meditate from scratch. Become a better candidate, a more efficient learner, a more productive employee, and a happier person by using the techniques you'll learn in this meditation course!",
      price: "65",
      image:
        "https://images.pexels.com/photos/1023756/pexels-photo-1023756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: [
        "To use meditation to become a more efficient learner",
        "How to make meditation a habit that is part of your daily life",
        "The health & wellness benefits of meditation",
      ],
    },
    {
      id: 2,
      title: "Power Lifting Bootcamp",
      subTitle:
        "This 4 Week Exercise Bootcamp Program was specifically designed for programmers and tech workers that spend long hours staring at a computer screen. In only 4 weeks, you'll build a new habit that will make you healthier, more productive, happier, and help you become a better version of you.",
      price: "23",
      image:
        "https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      content: [
        "4 Week Program that will be your step-by-step guide to fitness",
        "How to build strength and fitness without equipment",
        "Body weight exercises for all levels that you can do anywhere",
      ],
    },
  ],
  addProduct: (product) => {
    set((state) => ({ Products: [...state.Products, product] }));
  },
  deleteCourse: (id) => {
    set(() => ({
      Courses: get().Courses.filter((el) => el.id !== id),
    }));
  },

  removeAllBears: () => set({ Products: 0 }),
}));
export default useProductStore;

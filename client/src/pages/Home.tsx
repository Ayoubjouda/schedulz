import { useNavigate } from 'react-router-dom';
import Faqst from 'components/FaqsCard/FaqsCard';
import HeroImage from 'assets/images/imageProto.jpeg';
import ProductComponent from 'components/ProductComponent/ProductComponent';
import { Button } from 'components/ui/button';
const Home = () => {
  // Replace javascript:void(0) path with your path
  const footerNavs = [
    {
      href: 'javascriid()',
      name: 'About',
    },
    {
      href: 'javascrip)t:void(',
      name: 'Blog',
    },
    {
      href: 'javascrioid()',
      name: '',
    },
    {
      href: 'javascd()',
      name: 'Team',
    },
    {
      href: 'javascvoid()',
      name: 'Careers',
    },

    {
      href: 'javas:void()',
      name: 'Suuport',
    },
  ];

  const posts = [
    {
      id: 1,
      title: 'What is SaaS? Software as a Service Explained',
      categorie: 'Business',
      desc: 'Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some',
      img: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
      authorName: 'Sidi dev',
      date: 'Jan 4 2022',
      href: 'javasd(0)',
    },
    {
      id: 2,
      title: 'A Quick Guide to WordPress Hosting',
      categorie: 'Business',
      desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
      img: 'https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://api.uifaces.co/our-content/donated/FJkauyEa.jpg',
      authorName: 'Micheal',
      date: 'Jan 4 2022',
      href: 'javascrd(0)',
    },
    {
      id: 3,
      title: '7 Promising VS Code Extensions Introduced in 2022',
      categorie: 'Business',

      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
      img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://randomuser.me/api/portraits/men/46.jpg',
      authorName: 'Luis',
      date: 'Jan 4 2022',
      href: 'javd(0)',
    },
    {
      id: 4,
      title: 'How to Use Root C++ Interpreter Shell to Write C++ Programs',
      categorie: 'Business',
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
      img: 'https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg',
      authorName: 'Lourin',
      date: 'Jan 4 2022',
      href: 'javascrd(0)',
    },
    {
      id: 5,
      title: 'How to Use Root C++ Interpreter Shell to Write C++ Programs',
      categorie: 'Business',
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
      img: 'https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg',
      authorName: 'Lourin',
      date: 'Jan 4 2022',
      href: 'javascrd(0)',
    },
    {
      id: 6,
      title: 'How to Use Root C++ Interpreter Shell to Write C++ Programs',
      categorie: 'Business',
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
      img: 'https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      authorLogo: 'https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg',
      authorName: 'Lourin',
      date: 'Jan 4 2022',
      href: 'javascrd(0)',
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <section className="relative max-w-screen-xl px-4 py-4 mx-auto mt-32 cta-sec sm:px-8 ">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40"></div>
        <div className="relative items-center gap-5 lg:flex">
          <div className="flex-1 max-w-lg py-5 space-y-10 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
            <h3 className="text-3xl font-semibold text-gray-800 md:text-4xl lg:text-6xl">
              We do the planning,You do the learning. {''}
              <span className="text-emerald-500">Schedulz</span>
            </h3>
            <p className="mt-3 leading-relaxed text-gray-500">
              Nam erat risus, sodales sit amet lobortis ut, finibus eget metus.
              Cras aliquam ante ut tortor posuere feugiat. Duis sodales nisi id
              porta lacinia.
            </p>
            <button
              className="inline-flex items-center px-4 py-2 mt-5 font-medium font-semibold text-white rounded bg-emerald-600"
              onClick={() => navigate('/login')}
            >
              Try it out
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 ml-1 duration-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 mx-auto mt-5 sm:w-9/12 lg:mt-0 lg:w-auto">
            <img
              src={HeroImage}
              alt=""
              className="w-full rounded"
            />
          </div>
        </div>

        <style>{`
          .cta-sec {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }
        `}</style>
      </section>
      <div className="mt-24 ">
        <div className="flex flex-col items-center justify-center py-12 space-y-10">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-sm font-semibold leading-none text-gray-800 md:text-base">
              AS SEEN IN
            </h1>
            <div className="w-9 h-0.5 bg-gray-300" />
          </div>
          <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-16">
            <div className="h-3 w-11 md:w-16 md:h-5 lg:w-28 lg:h-8">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/partner_9_svg1.svg"
                alt="logo 1"
              />
            </div>
            <div className="w-16 h-3 lg:w-44 lg:h-8">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/partner_9_svg2.svg"
                alt="logo 2"
              />
            </div>
            <div className="w-16 h-2.5 md:w-16 md:h-2.5 lg:w-44 lg:h-6">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/partner_9_svg3.svg"
                alt="logo 3"
              />
            </div>
            <div className="h-3 w-11 md:w-16 md:h-5 lg:w-28 lg:h-8">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/partner_9_svg4.svg"
                alt="logo 4"
              />
            </div>
            <div className="w-8 h-3 md:w-16 md:h-7 lg:w-20 lg:h-8">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/partner_9_svg5.svg"
                alt="logo 5"
              />
            </div>
            <div className="h-3 w-11 md:w-16 md:h-5 lg:w-28 lg:h-8">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/partner_9_svg1.svg"
                alt="logo 5"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="max-w-screen-xl px-4 mx-auto mt-32 lg:px-8 ">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Courses to Get you Started
          </h1>
          <p className="mt-3 text-gray-500">
            Courses that are loved by the community. Updated every hour.
          </p>
        </div>

        <div className="grid gap-2 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((items, index) => (
            <ProductComponent
              key={index}
              product={{
                id: items.id,
                title: items.title,
                description: items.desc,
                categorie: items.categorie,
                authorName: items.authorName,
                price: 132,
                PostMedia: [{ id: 44, filePath: items.img }],
              }}
            />
          ))}
        </div>
        <div className="mx-auto my-10 w-fit ">
          <Button className="font-semibold text-md bg-emerald-600 hover:bg-emerald-700">
            Explore all Courses &rarr;
          </Button>
        </div>
      </section>
      <section className="py-14 bg-emerald-50">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="flex-1 sm:hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="md:max-w-lg sm:rounded-lg"
                alt=""
              />
            </div>
            <div className="max-w-xl px-4 mt-6 space-y-7 sm:px-0 md:mt-0 lg:max-w-2xl">
              <h3 className="font-semibold text-emerald-600">For Learners</h3>
              <p className="text-3xl font-semibold text-gray-800 sm:text-4xl">
                Take the next step toward tour goals
              </p>
              <p className="mt-3 text-gray-600">
                start,switch,or advance your carrer with more than 4000 courses,
                Professional Certificates, from world class universities and
                professionals in the field.
              </p>
              <a
                href="javascript:void(0)"
                className="inline-flex items-center font-medium duration-150 text-emerald-600 gap-x-1 hover:text-emerald-500"
              >
                Let&apos;s get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Faqst />
      <footer className="max-w-screen-xl px-4 py-5 mx-auto mt-32 text-gray-500 bg-white">
        <div className="max-w-lg sm:mx-auto sm:text-center">
          <div className="text-2xl font-bold text-emerald-600">schedulz</div>
          <p className="leading-relaxed mt-2 text-[15px]">
            Lorem Ipsum has been the industry&quot;s standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
        <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
          {footerNavs.map((item, index) => (
            <li
              key={index}
              className=" hover:text-gray-800"
            >
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
        <div className="items-center justify-between mt-8 sm:flex">
          <div className="mt-4 sm:mt-0">
            &copy; 2022 Float UI All rights reserved.
          </div>
          <div className="mt-6 sm:mt-0">
            <ul className="flex items-center space-x-4">
              <li className="flex items-center justify-center w-10 h-10 border rounded-full">
                <a href="javascrid()">
                  <svg
                    className="w-6 h-6 text-blue-400 svg-icon"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="none"
                      d="M18.258,3.266c-0.693,0.405-1.46,0.698-2.277,0.857c-0.653-0.686-1.586-1.115-2.618-1.115c-1.98,0-3.586,1.581-3.586,3.53c0,0.276,0.031,0.545,0.092,0.805C6.888,7.195,4.245,5.79,2.476,3.654C2.167,4.176,1.99,4.781,1.99,5.429c0,1.224,0.633,2.305,1.596,2.938C2.999,8.349,2.445,8.19,1.961,7.925C1.96,7.94,1.96,7.954,1.96,7.97c0,1.71,1.237,3.138,2.877,3.462c-0.301,0.08-0.617,0.123-0.945,0.123c-0.23,0-0.456-0.021-0.674-0.062c0.456,1.402,1.781,2.422,3.35,2.451c-1.228,0.947-2.773,1.512-4.454,1.512c-0.291,0-0.575-0.016-0.855-0.049c1.588,1,3.473,1.586,5.498,1.586c6.598,0,10.205-5.379,10.205-10.045c0-0.153-0.003-0.305-0.01-0.456c0.7-0.499,1.308-1.12,1.789-1.827c-0.644,0.28-1.334,0.469-2.06,0.555C17.422,4.782,17.99,4.091,18.258,3.266"
                    ></path>
                  </svg>
                </a>
              </li>

              <li className="flex items-center justify-center w-10 h-10 border rounded-full">
                <a href="javasid()">
                  <svg
                    className="w-6 h-6 text-blue-700 svg-icon"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="none"
                      d="M11.344,5.71c0-0.73,0.074-1.122,1.199-1.122h1.502V1.871h-2.404c-2.886,0-3.903,1.36-3.903,3.646v1.765h-1.8V10h1.8v8.128h3.601V10h2.403l0.32-2.718h-2.724L11.344,5.71z"
                    ></path>
                  </svg>
                </a>
              </li>

              <li className="flex items-center justify-center w-10 h-10 border rounded-full">
                <a href="javascrioid()">
                  <svg
                    className="w-6 h-6 text-blue-500 svg-icon"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="none"
                      d="M10,2.531c-4.125,0-7.469,3.344-7.469,7.469c0,4.125,3.344,7.469,7.469,7.469c4.125,0,7.469-3.344,7.469-7.469C17.469,5.875,14.125,2.531,10,2.531 M10,3.776c1.48,0,2.84,0.519,3.908,1.384c-1.009,0.811-2.111,1.512-3.298,2.066C9.914,6.072,9.077,5.017,8.14,4.059C8.728,3.876,9.352,3.776,10,3.776 M6.903,4.606c0.962,0.93,1.82,1.969,2.53,3.112C7.707,8.364,5.849,8.734,3.902,8.75C4.264,6.976,5.382,5.481,6.903,4.606 M3.776,10c2.219,0,4.338-0.418,6.29-1.175c0.209,0.404,0.405,0.813,0.579,1.236c-2.147,0.805-3.953,2.294-5.177,4.195C4.421,13.143,3.776,11.648,3.776,10 M10,16.224c-1.337,0-2.572-0.426-3.586-1.143c1.079-1.748,2.709-3.119,4.659-3.853c0.483,1.488,0.755,3.071,0.784,4.714C11.271,16.125,10.646,16.224,10,16.224 M13.075,15.407c-0.072-1.577-0.342-3.103-0.806-4.542c0.673-0.154,1.369-0.243,2.087-0.243c0.621,0,1.22,0.085,1.807,0.203C15.902,12.791,14.728,14.465,13.075,15.407 M14.356,9.378c-0.868,0-1.708,0.116-2.515,0.313c-0.188-0.464-0.396-0.917-0.621-1.359c1.294-0.612,2.492-1.387,3.587-2.284c0.798,0.97,1.302,2.187,1.395,3.517C15.602,9.455,14.99,9.378,14.356,9.378"
                    ></path>
                  </svg>
                </a>
              </li>

              <li className="flex items-center justify-center w-10 h-10 border rounded-full">
                <a href="javascrid()">
                  <svg
                    className="w-6 h-6 text-red-600 svg-icon"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="none"
                      d="M9.797,2.214C9.466,2.256,9.134,2.297,8.802,2.338C8.178,2.493,7.498,2.64,6.993,2.935C5.646,3.723,4.712,4.643,4.087,6.139C3.985,6.381,3.982,6.615,3.909,6.884c-0.48,1.744,0.37,3.548,1.402,4.173c0.198,0.119,0.649,0.332,0.815,0.049c0.092-0.156,0.071-0.364,0.128-0.546c0.037-0.12,0.154-0.347,0.127-0.496c-0.046-0.255-0.319-0.416-0.434-0.62C5.715,9.027,5.703,8.658,5.59,8.101c0.009-0.075,0.017-0.149,0.026-0.224C5.65,7.254,5.755,6.805,5.948,6.362c0.564-1.301,1.47-2.025,2.931-2.458c0.327-0.097,1.25-0.252,1.734-0.149c0.289,0.05,0.577,0.099,0.866,0.149c1.048,0.33,1.811,0.938,2.218,1.888c0.256,0.591,0.33,1.725,0.154,2.483c-0.085,0.36-0.072,0.667-0.179,0.993c-0.397,1.206-0.979,2.323-2.295,2.633c-0.868,0.205-1.519-0.324-1.733-0.869c-0.06-0.151-0.161-0.418-0.101-0.671c0.229-0.978,0.56-1.854,0.815-2.831c0.243-0.931-0.218-1.665-0.943-1.837C8.513,5.478,7.816,6.312,7.579,6.858C7.39,7.292,7.276,8.093,7.426,8.672c0.047,0.183,0.269,0.674,0.23,0.844c-0.174,0.755-0.372,1.568-0.587,2.31c-0.223,0.771-0.344,1.562-0.56,2.311c-0.1,0.342-0.096,0.709-0.179,1.066v0.521c-0.075,0.33-0.019,0.916,0.051,1.242c0.045,0.209-0.027,0.467,0.076,0.621c0.002,0.111,0.017,0.135,0.052,0.199c0.319-0.01,0.758-0.848,0.917-1.094c0.304-0.467,0.584-0.967,0.816-1.514c0.208-0.494,0.241-1.039,0.408-1.566c0.12-0.379,0.292-0.824,0.331-1.24h0.025c0.066,0.229,0.306,0.395,0.485,0.52c0.56,0.4,1.525,0.77,2.573,0.523c1.188-0.281,2.133-0.838,2.755-1.664c0.457-0.609,0.804-1.313,1.07-2.112c0.131-0.392,0.158-0.826,0.256-1.241c0.241-1.043-0.082-2.298-0.384-2.981C14.847,3.35,12.902,2.17,9.797,2.214"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <style>{`
          .svg-icon path,
          .svg-icon polygon,
          .svg-icon rect {
            fill: currentColor;
          }
        `}</style>
      </footer>
    </>
  );
};
export default Home;

import React, { useState, useEffect } from 'react';

import ProductComponent from '../../components/ProductComponent/ProductComponent';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { slice } from 'lodash';
import { Spinner } from '@chakra-ui/react';
import api from '../../api/api';
import { Label } from 'components/ui/label';
import { Checkbox } from 'components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';
const Courses = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery('courses', () =>
    api.get('courses/getAllCourses')
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [search, setSearch] = useState('');
  const [index, setIndex] = useState(8);
  const filtredPosts = data?.data?.filter((el) =>
    el.title.toLowerCase().includes(search)
  );
  const categoriePosts = filtredPosts?.filter((el) =>
    el.categorie.includes(id ? id : '')
  );
  const initialPosts = slice(categoriePosts, 0, index);
  useEffect(() => {
    if (index >= categoriePosts?.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [initialPosts]);

  const loadMore = () => {
    setIndex(index + 8);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center w-full h-[calc(100vh-65px)] my-10">
        {' '}
        <Spinner
          size="xl"
          color="green.600"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="m-6 text-4xl font-semibold text-gray-700 ">
          Courses to get you started
        </h1>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="m-6 text-2xl font-semibold text-gray-700"></h2>
        <div className="pt-2 relative  text-gray-600 max-w-[200px] sm:max-w-none ">
          <input
            className="h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 mt-5 mr-4"
          >
            <svg
              className="w-4 h-4 text-gray-600 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="w-1/5">
          <Accordion
            type="multiple"
            collapsible
            defaultValue={['item-1', 'item-2']}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="default"
                      id="r1"
                    />
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Worst"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Bad"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Not Bad"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Good"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Awesome"
                    ></i>
                    <Label
                      className="text-gray-400"
                      htmlFor="r1"
                    >
                      (1008)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="deflt"
                      id="r2"
                    />
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Worst"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Bad"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Not Bad"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Good"
                    ></i>
                    <i
                      className="text-xs text-gray-400 transition-all duration-200 mdi mdi-star hover:text-amber-500"
                      title="Awesome"
                    ></i>
                    <Label
                      className="text-gray-400"
                      htmlFor="r1"
                    >
                      (1038)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="defaut"
                      id="r3"
                    />
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Worst"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Bad"
                    ></i>
                    <i
                      className="text-xs transition-all duration-200 mdi mdi-star text-amber-400 hover:text-amber-500"
                      title="Not Bad"
                    ></i>
                    <i
                      className="text-xs text-gray-400 transition-all duration-200 mdi mdi-star hover:text-amber-500"
                      title="Good"
                    ></i>
                    <i
                      className="text-xs text-gray-400 transition-all duration-200 mdi mdi-star hover:text-amber-500"
                      title="Awesome"
                    ></i>
                    <Label
                      className="text-gray-400"
                      htmlFor="r1"
                    >
                      (1322)
                    </Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Video Duration</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      1-2 Hours
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      3-5 Hours
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      5-10 Hours
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      10+ Hours
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Topics</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      javascript
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      python
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      go lang
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      rust
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Level</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      All Level
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Beginner
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Intermidiate
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Expert
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Paid
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Free
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="w-4/5">
          <div className="justify-center pb-10 md:justify-start Courses-Section">
            {initialPosts?.map((product, index) => (
              <ProductComponent
                key={index}
                product={product}
                index={index}
              />
            ))}
          </div>
          <div className="text-center ">
            {categoriePosts.length === 0 ? (
              <div className="flex justify-center my-10 font-semibold">
                {' '}
                No Courses Found.
              </div>
            ) : null}
            {!isCompleted ? (
              <button
                onClick={loadMore}
                className="inline-block px-6 py-2 mb-10 mr-2 text-sm font-bold text-white uppercase align-middle transition-all duration-150 ease-in-out border border-solid rounded-md shadow outline-none focus:outline-none last:mr-0 bg-emerald-500 border-emerald-500 active:bg-emerald-600 active:border-emerald-600 hover:shadow-lg"
              >
                show more
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

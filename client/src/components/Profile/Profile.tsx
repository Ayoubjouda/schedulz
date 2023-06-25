import { useNavigate } from 'react-router-dom';
import useCoursesStore from '../../ZustandStore/store';
import { useForm } from 'react-hook-form';
import { Input, Spinner } from '@chakra-ui/react';
import _ from 'lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseFormSchemaValidator } from 'lib/validators/formValidators';
import { useProfile } from 'hooks/useProfile';

const Profile = () => {
  const formData: FormData = new FormData();
  const { currentUser } = useCoursesStore((state) => state);
  const navigate = useNavigate();
  const { isLoading, profileMutation } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
    resolver: zodResolver(courseFormSchemaValidator),
  });
  function removeEmpty(obj: any) {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }
  const onSubmit = async (data: any) => {
    const filtredData: any = removeEmpty(data);

    delete filtredData.profilePicture;
    delete filtredData.confirmPassword;
    formData.append('data', JSON.stringify(filtredData));
    if (data.profilePicture.length > 0)
      formData.append('profilePicture', data.profilePicture[0]);

    if (_.isEmpty(filtredData) && !formData.has('profilePicture')) return;
    profileMutation({ formdata: formData });
  };

  return (
    <div className="z-0 flex-1 ">
      <div className="max-w-3xl px-4 py-10 mx-auto sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-gray-900">
          Account
        </h1>

        <form
          className="mt-6 space-y-8 divide-y divide-y-blue-gray-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">
                First name
              </label>
              <Input
                type="text"
                id="first-name"
                style={{ backgroundColor: 'white' }}
                {...register('firstName')}
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">
                Last name
              </label>
              <Input
                type="text"
                style={{ backgroundColor: 'white' }}
                id="last-name"
                {...register('lastName')}
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-blue-gray-900">
                Username
              </label>
              <div className="flex mt-1 rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md border-blue-gray-300 bg-blue-gray-50 text-blue-gray-500 sm:text-sm">
                  schedulz.com/
                </span>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  disabled
                  style={{ backgroundColor: 'white' }}
                  value={currentUser.username}
                  className="flex-1 block w-full min-w-0 rounded-none rounded-r-md border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-blue-gray-900">
                Photo
              </label>
              <div className="flex items-center mt-1">
                <img
                  className="inline-block object-cover w-12 h-12 rounded-full"
                  src={currentUser.profilePicture}
                  alt=""
                />
                <div className="z-0 flex ml-4">
                  <div className="relative z-0 flex items-center w-20 px-3 py-2 bg-white border rounded-md shadow-sm cursor-pointer border-blue-gray-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50">
                    <label className="z-0 text-sm font-medium pointer-events-none text-blue-gray-900">
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                    <input
                      id="user-photo"
                      type="file"
                      {...register('profilePicture')}
                      className="absolute top-0 right-0 w-48 h-48 border-gray-300 rounded-md opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 pt-8 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">
                Security
              </h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                This information is private do not share it.
              </p>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">
                Current Passwond
              </label>
              <Input
                type="password"
                id="Current Passwond"
                {...register('currentPassword')}
                style={{ backgroundColor: 'white' }}
                placeholder="********"
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.currentPassword && (
                <p className="text-xs italic text-red-500">Short Password</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">
                New Passwond
              </label>
              <Input
                type="password"
                id="New Passwond"
                {...register('newPassword')}
                placeholder="********"
                style={{ backgroundColor: 'white' }}
                className="block w-full mt-1 rounded-md shadow-sm border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.newPassword && (
                <p className="text-xs italic text-red-500">Short Password</p>
              )}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-blue-gray-900">
                Confirm Passwond
              </label>
              <Input
                type="password"
                id="Confirm Passwond"
                {...register('confirmPassword')}
                style={{ backgroundColor: 'white' }}
                placeholder="********"
                className="block w-full mt-1 rounded-md shadow-sm text-blue-gray-900 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
              {errors?.confirmPassword && (
                <p className="text-xs italic text-red-500">
                  Passwords don&quot;t match.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="button"
              onClick={() => navigate('/dashboard/marketplace')}
              className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? <Spinner /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

export default function Rewards() {
  const userPoints = useLoaderData().userPoints.data;
  const availableRewards = useLoaderData().availableRewards.data;
  const earnedRewards = useLoaderData().earnedRewards.data;

  const redeemReward = async (rewardId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    };

    await axios.post(
      `http://localhost:8080/user-rewards/redeem/${rewardId}`,
      config
    );
  };

  return (
    <div>
      <div className='container mx-auto px-6 py-10'>
        {/* Rewards Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold'>Rewards</h1>
          <p className='text-lg mt-2'>
            Your earned rewards and points:{' '}
            <span className='font-semibold'>{userPoints} Points</span>
          </p>
        </div>

        {/* Earned Rewards Section */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold mb-6'>Earned Rewards</h2>
          {earnedRewards.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {earnedRewards.map((reward) => (
                <div
                  key={reward.reward.rewardId}
                  className='bg-base-100 p-6 shadow-md rounded-lg'
                >
                  <h3 className='text-xl font-bold mb-2'>
                    {reward.reward.name}
                  </h3>
                  <p className='text-gray-600 mb-4'>
                    {reward.reward.description}
                  </p>
                  <span className='badge badge-success'>
                    Earned: {reward.reward.pointsRequired} Points
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-700'>
              You have not earned any rewards yet.
            </p>
          )}
        </div>

        {/* Available Rewards Section */}
        <div>
          <h2 className='text-2xl font-bold mb-6'>Available Rewards</h2>
          {availableRewards.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {availableRewards.map((reward) => (
                <div
                  key={reward.id}
                  className='bg-base-100 p-6 shadow-md rounded-lg'
                >
                  <h3 className='text-xl font-bold mb-2'>{reward.name}</h3>
                  <p className='text-gray-600 mb-4'>{reward.description}</p>
                  <span className='badge badge-info'>
                    Requires: {reward.points} Points
                  </span>
                  <button
                    className={`btn btn-primary mt-4 w-full ${
                      userPoints >= reward.points ? '' : 'btn-disabled'
                    }`}
                    disabled={userPoints < reward.points}
                    onClick={() => redeemReward(reward.id)}
                  >
                    {userPoints >= reward.points
                      ? 'Redeem'
                      : 'Not Enough Points'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-700'>No available rewards at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

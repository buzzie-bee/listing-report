import { AverageBySeller } from './features/AverageBySeller/AverageBySeller';
import { AveragePricePopular } from './features/AveragePricePopular/AveragePricePopular';
import { Distribution } from './features/Distribution/Distribution';
import { TopFiveByMonth } from './features/TopFiveByMonth/TopFiveByMonth';

export const App = () => {
  return (
    <div className="w-screen h-full">
      <div className="container p-1 sm:p-8 mx-auto">
        <div className="flex flex-row justify-center items-center mb-8">
          <h1 className="text-4xl font-bold inline-block">
            Listings Reporting
          </h1>
        </div>
        <AverageBySeller />
        <Distribution />
        <AveragePricePopular />
        <TopFiveByMonth />
      </div>
    </div>
  );
};

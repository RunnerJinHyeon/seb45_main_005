import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setServeyB } from '../../../redux/slice/MUBTISlice';

const SurveyLiking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSurvey = (b: number) => {
    dispatch(setServeyB(b));
    navigate('../mubti/loading');
  };

  return (
    <div
      style={{
        height: '100vh',
        background: '#35435e',
      }}
      className="flex flex-col justify-center items-center"
    >
      <div className="flex flex-row justify-between items-center w-[250px] ">
        <button className="w-[20px] h-[20px] bg-[#d9d9d9] rounded-full "></button>
        <button className="w-[20px] h-[20px] bg-[#797676] rounded-full border-2 border-red-100 "></button>
        <button className="w-[20px] h-[20px] bg-[#d9d9d9] rounded-full"></button>
        <button className="w-[20px] h-[20px] bg-[#d9d9d9] rounded-full"></button>
      </div>
      <h2 className="text-white text-2xl font-bold my-8">본인의 취향을 골라주세요!!</h2>
      <button
        onClick={() => handleSurvey(1)}
        // href="./loading"
        className="inline-flex justify-center items-center w-[450px] h-[50px] bg-[#D9D9D9] text-black font-bold my-5 rounded-full hover:bg-[#EFD0A0]"
      >
        신나고 활기찬
      </button>
      <button
        onClick={() => handleSurvey(2)}
        className="inline-flex justify-center items-center w-[450px] h-[50px] bg-[#D9D9D9] text-black font-bold my-5 rounded-full hover:bg-[#EFD0A0]"
      >
        잔잔하고, 고요한
      </button>
      <button
        onClick={() => handleSurvey(3)}
        className="inline-flex justify-center items-center w-[450px] h-[50px] bg-[#D9D9D9] text-black font-bold my-5 rounded-full hover:bg-[#EFD0A0]"
      >
        클래식한
      </button>
      <button
        onClick={() => handleSurvey(4)}
        className="inline-flex justify-center items-center w-[450px] h-[50px] bg-[#D9D9D9] text-black font-bold my-5 rounded-full hover:bg-[#EFD0A0]"
      >
        담당자가 추천해준 노래
      </button>
    </div>
  );
};

export default SurveyLiking;

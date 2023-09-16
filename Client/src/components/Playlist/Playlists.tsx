import { useDispatch } from 'react-redux';
import { openSongLists } from '../../redux/slice/ModalSlice';
import { setSelectedMemberId, setSelectedPlaylistId } from '../../redux/slice/PlaylistsSlice';
import Album from '../../assets/images/Album.png';
import { PlaylistInfo } from './PlaylistsShowAll';

type PlaylistProps = {
  el: PlaylistInfo;
  playlistId: number;
  memberId: number;
};

const Playlists = ({ el }: PlaylistProps) => {
  const dispatch = useDispatch();

  const handleOpenDetail = () => {
    dispatch(openSongLists());
    dispatch(setSelectedPlaylistId(el.playlistId));
    dispatch(setSelectedMemberId(el.memberId));
  };

  return (
    <>
      <li className="w-[100px] h-[150px] relative flex flex-col justify-center items-center text-center hover:translate-y-[-15px] transition duration-300 ease-in-out ">
        {/* 플리 리스트들 */}
        <div onClick={handleOpenDetail} className="h-[100px]">
          <img src={Album} className="w-[100px] h-[100px]" />
          <h1 className="mt-4 text-xs">{el.title}</h1>
        </div>
      </li>
    </>
  );
};

export default Playlists;

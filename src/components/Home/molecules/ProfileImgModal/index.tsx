import {
  deleteProfileImage,
  patchProfileImage,
  postProfileImage,
} from 'api/member';
import { CameraIcon, TrashcanIcon } from 'assets/svg';
import ModalHeader from 'components/Common/atoms/ModalHeader';
import { ModalOverayWrapper } from 'components/Common/atoms/Wrappers/ModalOverayWrapper/style';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import {
  imgBase64profile,
  profileModalState,
} from 'recoilAtoms/recoilAtomContainer';
import { Palette } from 'styles/globals';
import useSWR from 'swr';
import { myProfileType } from 'types';
import { MemberController } from 'utils/Libs/requestUrls';
import { getCroppedImg } from 'utils/canvas';
import * as S from './style';
import { apiClient } from 'utils/Libs/apiClient';
import { mutate } from 'swr';
const ProfileImgModal = () => {
  const [profileImgModal, setProfileImgModal] =
    useRecoilState(profileModalState);
  const [imgBase64, setImgBase64] = useRecoilState(imgBase64profile);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const router = useRouter();

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const { data } = useSWR<myProfileType>(MemberController.myProfile);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  useEffect(() => {
    if (data?.profileImage) setImgBase64(data?.profileImage);
  }, [data?.profileImage, setImgBase64]);

  const handleSubmitClick = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imgBase64, 0, croppedAreaPixels);
      if (data?.profileImage) {
        await patchProfileImage(croppedImage ?? '');
        setProfileImgModal(false);
        toast.success('프로필 이미지를 수정했습니다');
      } else {
        await postProfileImage(croppedImage ?? '');
        setProfileImgModal(false);
        toast.success('프로필 이미지를 추가했습니다');
      }

      const { data: homeData } = await apiClient.get(
        MemberController.myProfile
      );
      mutate(MemberController.myProfile, { ...data, profileImage: homeData.profileImage });
    } catch (e) {
      toast.warning('새로운 이미지를 선택해주세요');
    }
  }, [
    data,
    imgBase64,
    croppedAreaPixels,
    setProfileImgModal,
  ]);

  const handleChangeFile = useCallback((event: any) => {
    event.preventDefault();
    setCroppedAreaPixels(undefined);
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) setImgBase64(base64.toString());
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }, []);

  const handleRemoveClick = async () => {
    await deleteProfileImage();
    setProfileImgModal(false);
    toast.success('프로필 이미지를 삭제했습니다.');
    mutate(MemberController.myProfile, { ...data, profileImage: null });
  };

  return (
    <>
      <ModalOverayWrapper
        isClick={profileImgModal}
        onClick={() => setProfileImgModal(false)}
      >
        <S.ProileImgModalWrapper onClick={(e) => e.stopPropagation()}>
          <ModalHeader
            name={imgBase64 ? '이미지 편집' : '프로필 이미지 선택'}
            setState={setProfileImgModal}
          />
          {imgBase64 ? (
            <S.ImgCrop>
              <Cropper
                image={imgBase64}
                crop={crop}
                zoom={zoom}
                aspect={5 / 5}
                showGrid={false}
                objectFit="vertical-cover"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    borderRadius: '8px',
                    color: `${Palette.BACKGROUND_CARD}`,
                    width: '100%',
                    height: '100%',
                  },
                  cropAreaStyle: {
                    borderRadius: '8px',
                    color: `${Palette.BACKGROUND_CARD}`,
                  },
                }}
              />
              {data?.profileImage && (
                <S.TrashIconBox onClick={handleRemoveClick}>
                  <TrashcanIcon />
                </S.TrashIconBox>
              )}
            </S.ImgCrop>
          ) : (
            <label htmlFor="add_img">
              <S.AddImgBtn>
                <CameraIcon />
                <span>이미지 추가</span>
                <input
                  id="add_img"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleChangeFile}
                  accept="image/*"
                />
              </S.AddImgBtn>
            </label>
          )}
          {imgBase64 && (
            <S.BottomBtns>
              <S.CancelBtn htmlFor="change_img">
                수정
                <input
                  id="change_img"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleChangeFile}
                  accept="image/*"
                />
              </S.CancelBtn>
              <S.SubmitBtn onClick={handleSubmitClick}>확인</S.SubmitBtn>
            </S.BottomBtns>
          )}
        </S.ProileImgModalWrapper>
      </ModalOverayWrapper>
    </>
  );
};

export default ProfileImgModal;

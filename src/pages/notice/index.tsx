import CommonHeader from 'components/Common/organisms/CommonHeader';
import SideBar from 'components/Common/organisms/Sidebar';
import { MainTemplates } from 'components/Common/templates/MainTemplates/style';
import NoticeEmpty from 'components/Notice/organisms/NoticeEmpty';
import NoticeList from 'components/Notice/organisms/NoticeList';
import NoticeWrite from 'components/Notice/organisms/NoticeWrite';
import {
  NoticeTemplate,
  NoticeWrapper,
} from 'components/Notice/templates/NoticeTemplate/style';
import UseThemeEffect from 'hooks/useThemeEffect';
import { GetServerSideProps, NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { isNoticeWrite } from 'recoilAtoms/recoilAtomContainer';
import { SWRConfig } from 'swr';
import { noticePageProps } from 'types';
import { apiClient } from 'utils/Libs/apiClient';
import { getRole } from 'utils/Libs/getRole';
import { getToken } from 'utils/Libs/getToken';
import { SelfstudyController } from 'utils/Libs/requestUrls';

const Notice: NextPage<{
  fallback: Record<string, noticePageProps>;
  role: string;
}> = ({ fallback, role }) => {
  UseThemeEffect();
  const isWrite = useRecoilValue(isNoticeWrite);
  return (
    <SWRConfig value={fallback}>
      <MainTemplates>
        <SideBar role={role} />
        <NoticeTemplate>
          <CommonHeader />
          <NoticeWrapper>
            <NoticeList />
            {isWrite ? <NoticeWrite /> : <NoticeEmpty />}
          </NoticeWrapper>
        </NoticeTemplate>
      </MainTemplates>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Authorization } = await getToken(ctx);
  const role = getRole(ctx);

  if (!Authorization) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const { data: selfStudyData } = await apiClient.get(
    SelfstudyController.selfStudyInfo(role),
    { headers: { Authorization } }
  );

  return {
    props: {
      fallback: {
        [SelfstudyController.selfStudyInfo(role)]: selfStudyData,
      },
      role,
    },
  };
};

export default Notice;

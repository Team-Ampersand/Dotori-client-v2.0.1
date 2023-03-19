export const MemberController = {
  signup: '/auth/signup',
  auth: '/auth',
  emailCheck: '/email/signup',
  authcheck: '/email/verify-email',
  changePasswd: '/members/password',
  myProfile: '/home',
};

export const NoticeController = {
  getNotice(role: string) {
    return `/${role}/board`;
  },
  boardId(boardIdx: number) {
    return `/board/${boardIdx}`;
  },
};

export const SelfstudyController = {
  selfStudy(role: string) {
    return `/${role}/self-study`;
  },
  selfStudyInfo(role: string) {
    return `/${role}/self-study/info`;
  },
  studyModify(role: string, num: number) {
    return `/${role}/selfstudy/modify/${num}`;
  },
  selfStudyRank(role: string) {
    return `/${role}/self-study/rank`;
  },
  selfStudySearch(
    name: string,
    gender: string,
    classNum: string,
    grade: string,
    role: string,
    selfStudyCheck: boolean | null
  ) {
    return `/student-info/search?name=${name}?gender=${gender}?classNum=${classNum}?grade=${grade}?role=${role}?selfStudyCheck=${selfStudyCheck}`;
  },
};

export const MassageController = {
  massage(role: string) {
    return `/${role}/massage`;
  },
  cancelMassage(role: string) {
    return `/${role}/cancel/massage`;
  },
  modifyMassage(role: string, num: number) {
    return `/${role}/modify/massage/${num}`;
  },
  massageRank(role: string) {
    return `/${role}/massage/rank`;
  },
};

export const penaltyController = {
  strRule(role: string) {
    return `${role}/rule`;
  },
};

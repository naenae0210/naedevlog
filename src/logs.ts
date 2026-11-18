// naelog 아래의 로그 목록. 글은 <meta name="post:log" content="<id>"> 로 어느 로그에 속하는지 정한다.
// en: 영어 목록 페이지(/en/<id>/)의 문구. enPosts: 글 자체의 영어판이 있는지. 없으면 영어 목록에서 한국어 글로 연결한다.
export interface LogInfo { id: string; name: string; heading: string; intro: string; en: { heading: string; intro: string }; enPosts?: boolean }

export const SITE = {
  name: 'naelog',
  // 목록 페이지는 한국어판도 영어 제목 한 줄만 둔다(소개 없음).
  heading: 'Learning, reading, and keeping notes',
  intro: '',
};

export const LOGS: LogInfo[] = [
  { id: 'dev', name: 'dev', heading: 'Learning to build, one note at a time', intro: '',
    en: { heading: 'Learning to build, one note at a time', intro: '' }, enPosts: true },
  { id: 'book', name: 'book', heading: 'Sentences that stayed with me', intro: '',
    en: { heading: 'Sentences that stayed with me', intro: '' } },
  { id: 'scrap', name: 'scrap', heading: 'Articles worth thinking about', intro: '',
    en: { heading: 'Articles worth thinking about', intro: '' } },
];

// /en/ 이 영어 전체 목록, /en/<id>/ 가 로그별 목록이다. 세 로그 모두 보인다.
// 글의 영어판은 dev 만 있다. book, scrap 글에는 EN 링크가 없다.
export const SITE_EN = {
  name: 'naelog',
  heading: 'Learning, reading, and keeping notes',
  intro: '',
};

export const DEFAULT_LOG = 'dev';
export const logOf = (id: string) => LOGS.find((l) => l.id === id) ?? LOGS[0];

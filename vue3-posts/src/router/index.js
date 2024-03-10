import {
	createRouter,
	// createWebHashHistory,
	createWebHistory,
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		// /user/alice
		// /user/alice	->	PostDetailView
		// /user/alice
		path: '/posts/:id', // 동적 라우팅 -> 여러 URL을 하나의 페이지 컴포넌트에 매핑할 때 사용, :id는 파라미터명
		name: 'PostDetail',
		component: PostDetailView,
		props: true,
		// props: route => {
		// 	return {
		// 		id: parseInt(route.params.id),
		// 	};
		// },
		// props: route => ({ id: parseInt(route.params.id) }),
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
	// 중첩된 라우트 -> RouterView를 한 번 더 선언한다
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			{
				// /nested/one
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				// /nested/one
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				// /nested/two
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
];

// router : 페이지를 이동할 수 있게 해주는 객체
// routes : 현재 페이지 컴포넌트의 정보
const router = createRouter({
	// # 이 붙고 안붙고의 차이
	// history, hash의 차이는 운영서버에 배포할 때 차이가 남
	// index.html 하나만 배포하게 되는데
	// hash 모드로 동작시 		-> # 뒤의 값은 보내지 않음(RequestURL: http:localhost:3000)
	// history 모드로 동작시 	-> # 전체 경로를 보냄(RequestURL: http:localhost:3000/nested/one)
	// 대부분 서버는 루트로만 요청 시 index.html 을 돌려줌
	// 즉, history 모드에서 아래와 같은 경로로 요청 시
	// http:localhost:3000/nested/one
	// 해당 경로에 html 파일이 있지 않은 이상 404 에러가 뜨게 됨(history 모드는 추가 설정 필요)
	history: createWebHistory('/'), // history 모드로 동작: url -> # 안붙음
	// history: createWebHashHistory(),
	routes,
});

export default router;

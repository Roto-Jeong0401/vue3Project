import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';

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
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
];

// router : 페이지를 이동할 수 있게 해주는 객체
// routes : 현재 페이지 컴포넌트의 정보
const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;

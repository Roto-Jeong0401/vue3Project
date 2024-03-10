<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control" />
				</div>
				<div class="col-3">
					<select v-model="params._limit" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div>
		<nav class="mt-5" aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item" :class="{ disabled: !(params._page > 1) }">
					<a
						class="page-link"
						href="#"
						aria-label="Previous"
						@click.prevent="--params._page"
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li
					v-for="page in pageCount"
					:key="page"
					class="page-item"
					:class="{ active: params._page === page }"
				>
					<a class="page-link" href="#" @click.prevent="params._page = page">{{
						page
					}}</a>
				</li>
				<li
					class="page-item"
					:class="{ disabled: !(params._page < pageCount) }"
				>
					<a
						class="page-link"
						href="#"
						aria-label="Next"
						@click.prevent="++params._page"
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
		<hr class="my-5" />
		<AppCard>
			<PostDetailView :id="1"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3, // 페이지당 몇개씩 보여줄 것인가
	title_like: '',
});

// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
); // 페이지 갯수 - 몇개의 페이지로 보여줄것인가

const fetchPost = async () => {
	// posts.value = getPosts();
	/**
	 * promise는 자바스크립트에서 비동기를 처리할 때 사용하는 객체
	 * 값을 받을 때는 then()으로 받을 수 있고 그 안에 콜백함수를 지정해주면 됨
	 * 오류를 받을 때는 catch()
	 * promise 대신에 async, await 사용 가능
	 */
	// const response = getPosts();
	try {
		const { data, headers } = await getPosts(params.value);
		posts.value = data;
		totalCount.value = headers['x-total-count']; // 중간에 하이픈(-)이 있기때문에 대괄호 표기법으로 가져온다.
	} catch (error) {
		console.error(error);
	}
};

// fetchPost();

/**
 * 반응형 상태가 변경되면 해당 콜백함수를 다시 실행하게 됨
 * watch와는 달리 초기에 한번 실행 함
 */
watchEffect(fetchPost);
const goPage = id => {
	// router.push('/posts/' + id);
	// push 메소드에 문자열 뿐 아니라 객체도 넣을 수 있다.
	// router.push(`/posts/${id}`);
	// http://localhost:5173/posts/1?searchText=hello#world!
	/** router.push({
		name: 'PostDetail',
		params: {
			id,
		},
		query: {
			searchText: 'hello',
		},
		hash: '#world!',
	}); */
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
</script>

<style lang="scss" scoped></style>

<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:contents="post.contents"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { getPosts } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

const fetchPost = () => {
	posts.value = getPosts();
};

fetchPost();

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

<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>
		<hr class="my-4" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
		<!--
			<p>params: {{ $route.params }}</p>
			<p>query: {{ $route.query }}</p>
			<p>hash: {{ $route.hash }}</p>
		--></div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { ref } from 'vue';

const props = defineProps({
	id: [String, Number],
});

// const route = useRoute();
const router = useRouter();

// const id = route.params.id;

/**
 * ref
 * 장) 객체 할당 가능
 * 단) form.value.title, form.value.content
 * 장) 일관성 유지
 *
 * reactive
 * 단) 객체 할당 불가능
 * 장) form.title, form.content
 */
const post = ref({}); // reference, primitive type 둘 다 할당 가능
// let form = reactive({}); // reference type만 할당 가능

// console.log('post: ', getPostById(id));
const fetchPost = async () => {
	// console.log(props.id);
	try {
		const { data } = await getPostById(props.id);
		setPost(data);
	} catch (error) {
		console.error(error);
	}
};
const setPost = ({ title, content, createdAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createdAt = createdAt;
};
fetchPost();

const remove = async () => {
	try {
		if (confirm('삭제 하시겠습니까?') === false) {
			return;
		}
		await deletePost(props.id);
		router.push({ name: 'PostList' });
	} catch (error) {
		console.error(error);
	}
};
const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
/** const goEditPage = id => {
	router.push({
		name: 'PostEdit',
		params: {
			id,
		},
	});
}; */
</script>

<style lang="scss" scoped></style>

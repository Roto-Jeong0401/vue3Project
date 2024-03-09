<template>
	<div>
		<h2>About View</h2>
		<p>{{ $route.path }}</p>
		<button class="btn btn-primary" @click="$router.push('/')">
			Home으로 이동
		</button>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';

// routes 객체를 setup 함수 내에서 사용할 시
// useRoute() 함수를 호출해서 사용
const route = useRoute();
console.log('route.path', route.path);
</script>

<style lang="scss" scoped></style>

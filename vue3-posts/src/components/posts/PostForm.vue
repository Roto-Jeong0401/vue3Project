<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<!-- input에서 v-model을 풀때는 :value에 props를 넣고, @input 이벤트로 값을 받아온다. -->
			<input
				:value="title"
				@input="$emit('update:title', $event.target.value)"
				type="text"
				class="form-control"
				id="title"
			/>
		</div>
		<div class="mb-3">
			<label for="content" class="form-label">내용</label>
			<textarea
				:value="content"
				@input="$emit('update:content', $event.target.value)"
				class="form-control"
				id="content"
				rows="3"
			></textarea>
		</div>
		<!-- slot: 부모컴포넌트에서 다른 태그를 전달할 수 있게 한다.-->
		<div class="d-flex gap-2 mt-4">
			<slot name="actions"></slot>
		</div>
	</form>
</template>

<script setup>
defineProps({
	title: String,
	content: String,
});

/**
 * 다중 v-model을 구현하기 위해 defineEmits
 */
defineEmits(['update:title', 'update:content']);
</script>

<style lang="scss" scoped></style>

<template>
	<div class="card">
		<!-- slot 객체로 slot이 없을 경우 랜더링 하지 않도록 조건 -->
		<div v-if="$slots.header" class="card-header">
			<slot name="header"></slot>
		</div>
		<div v-if="$slots.default" class="card-body">
			<slot></slot>
		</div>
		<div v-if="$slots.footer" class="card-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

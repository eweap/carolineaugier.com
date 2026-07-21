<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
  }>(),
  {
    size: 64,
  },
);
</script>

<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      :width="size"
      :height="size"
    >
      <g>
        <rect
          class="fill-neutral-900"
          x="17.5"
          y="30"
          width="5"
          height="60"
        >
          <animate
            attributeName="y"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="18;30;30"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.2s"
          />

          <animate
            attributeName="height"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="64;40;40"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.2s"
          />
        </rect>

        <rect
          class="fill-neutral-900"
          x="42.5"
          y="30"
          width="5"
          height="40"
        >
          <animate
            attributeName="y"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="20.999999999999996;30;30"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.1s"
          />

          <animate
            attributeName="height"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="58.00000000000001;40;40"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.1s"
          />
        </rect>

        <rect
          class="fill-neutral-900"
          x="67.5"
          y="30"
          width="5"
          height="60"
        >
          <animate
            attributeName="y"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="20.999999999999996;30;30"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          />

          <animate
            attributeName="height"
            repeatCount="indefinite"
            dur="1s"
            calcMode="spline"
            keyTimes="0;0.5;1"
            values="58.00000000000001;40;40"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
          />
        </rect>
      </g>
    </svg>
  </div>
</template>

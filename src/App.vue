<template>
  <UApp :toaster="{ position: 'top-right' }">
    <UHeader>
      <template #left>
        <RouterLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </RouterLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/xerox0213"
          target="_blank"
          icon="simple-icons:github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <RouterView />
    </UMain>
  </UApp>
</template>

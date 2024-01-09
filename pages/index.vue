<template>
  <div>
    <FeatureGroup icon="/icons/chat.svg" alt="Chat Icon" heading="Link" colored-heading="other chats" description="Link a chat from a different app to Discord! Although there is no limitations, this is designed for video game chats.">
      <!-- <NuxtLink to="/wiki/chat"><button><h3>See supported apps and configuration</h3></button></NuxtLink> -->
      <Button icon="/icons/config.svg" text="Configuration" page="/wiki/chat" />
    </FeatureGroup>
    <FeatureGroup icon="/icons/code.svg" alt="Chat Icon" heading="Fully" colored-heading="open source" description="This project is fully open source. You can check out the source code on GitHub. This project is licensed under the MIT license." should-switch>
      <Button icon="/icons/github-mark.svg" text="View on Github" page="https://github.com/Inkane/discord-bot-panel" />
    </FeatureGroup>
  </div>
</template>
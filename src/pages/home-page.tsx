import { useState } from "react";
import { ContentLayout } from "../components/layouts/content-layout";
import { MainLayout } from "../components/layouts/main-layout";
import { AppBar } from "../components/templates/app-bar";
import { MangaBorder } from "../components/templates/manga-border";

export const HomePage = () => {
  const [sidebarState, setSidebarState] = useState<boolean>(false);

  return (
    <MainLayout title="App">
      <ContentLayout sidebarState={sidebarState}>
        <AppBar
          onBarClick={() => {
            setSidebarState((state) => !state);
          }}
        />
        <MangaBorder />
      </ContentLayout>
    </MainLayout>
  );
};

import React from 'react'
import { PageLayout, SideNav, Text, Heading, StyledOcticon } from '@primer/react'
import { ArrowRightIcon } from '@primer/octicons-react'

const index = () => {
  return (
  <PageLayout>
    <PageLayout.Pane>
      <Heading sx={{fontSize: 2, mb: 2}}>Settings</Heading>
      <SideNav bordered maxWidth={360} aria-label="Main">
        <SideNav.Link href="#account" variant="full">
          <Text>Departments</Text>
          <StyledOcticon sx={{mr: 2}} size={16} icon={ArrowRightIcon} color="success.fg" />
        </SideNav.Link>
        <SideNav.Link href="#account" variant="full">
          <Text>Departments Departments Departments</Text>
          <StyledOcticon sx={{mr: 2}} size={16} icon={ArrowRightIcon} color="success.fg" />
        </SideNav.Link>
    </SideNav>

    </PageLayout.Pane>
  </PageLayout>
  );
};

export default index;
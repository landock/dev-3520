import React from "react";
import { NextPage } from "next";
import Wizard from "../components/wizard";
import Buy from "../components/buy";
import { useRouter } from 'next/router'
import CardDetails from "../components/cardDetails";
import Address from "../components/address";
import PersonalDetails from "../components/personalDetails";
import WidgetLayout from "../components/layout";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => {
  const router = useRouter();
  const {slug} = router.query;
  console.log(router, slug);
  const {Page} = Wizard;
  return (
    <WidgetLayout>
      <Wizard
        initialValues={{ firstName: "bagel", amount:10}}
        onSubmit={onSubmit}
      >
        <Page>
          <Buy />
        </Page>
        <Page >
          <CardDetails /> 
        </Page>
        <Page>
          <Address />
        </Page>
        <Page>
          <PersonalDetails />
        </Page>
      </Wizard>
    </WidgetLayout>
  );
};

export default Home;

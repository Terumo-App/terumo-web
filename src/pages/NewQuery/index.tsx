import { Header } from "../../components/Header";
import React, { useContext, useState } from "react";
import { Button, message, Steps } from "antd";
import { Container, PageTittle, ButtonPrimary } from "./styles";
import { IoSearch } from "react-icons/io5";
// import { CollectionsSelect } from "../../components/CollectionsSelect";
import { CollectionSelectionStep } from "../../components/Steps/CollectionSelection";
import { QueryImageTypeStep } from "../../components/Steps/QueryImageType";
import { ImageUploadStep } from "../../components/Steps/ImageUpload";
import { SemanticAttributeStep } from "../../components/Steps/SemanticAttributes";
import { LoadingSearchStep } from "../../components/Steps/LoadingSearch";
import { sleep } from "../../utils/utils";
import { NewQueryContext } from "../../hooks/NewQueryContext";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/styles.module.scss";

export function NewQuery() {
  const { createNewQuery, validateForm } = useContext(NewQueryContext);

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const redirectResult = async () => {
    await sleep(2500);

    navigate("query-result", {
      preventScrollReset: false,
    });

    return null;
  };

  const steps = [
    {
      title: "",
      content: <ImageUploadStep />,
    },
    {
      title: "",
      content: <QueryImageTypeStep />,
    },
    {
      title: "",
       // content: <Content><h2>Collection selection</h2> <CollectionsSelect /> </Content> ,
      content: <CollectionSelectionStep />,
    },
    {
      title: "",
      content: <SemanticAttributeStep />,
    },
    {
      title: "",
      content: <LoadingSearchStep message="Loading..." />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    minHeight: "560px",
    textAlign: "center",
    color: "#f0f0f0",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    border: `1px solid #f0f0f0`,
    marginTop: 16,
    paddingBottom: 40,
  };

  return (
    <>
      <Header />

      <Container>
        <PageTittle>
          <IoSearch />
          <h3>Image search</h3>
        </PageTittle>

        <Steps current={current} items={items} />

        <div style={contentStyle}> {steps[current].content}</div>

        <div style={{ marginTop: 20, marginBottom: 40 }}>
          {current > 0 && current < steps.length && (
            <ButtonPrimary style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </ButtonPrimary>
          )}
          {current < steps.length - 2 && (
            <ButtonPrimary
              onClick={() => {
                if (!validateForm(current)) {
                  message.error({
                    content: "Informe ao menos um item",
                    style: { marginTop: 100 },
                  });
                  return;
                }
                next();
              }}
            >
              Next
            </ButtonPrimary>
          )}
          {current === steps.length - 2 && (
            <ButtonPrimary
              onClick={() => {
                if (!validateForm(current)) {
                  message.error({
                    content: "Informe ao menos um item",
                    style: { marginTop: 100 },
                  });
                  return;
                }
                next();
                createNewQuery();
                redirectResult();
              }}
            >
              Run Search
            </ButtonPrimary>
          )}
        </div>
      </Container>
    </>
  );
}

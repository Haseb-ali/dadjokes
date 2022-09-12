import Head from "next/head";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Image, Col, Row, Button, Typography, Card, Skeleton } from "antd";

const { Title } = Typography;
export default function Home() {
  const date = new Date();
  const [joke, setJoke] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const laodRandomDadJokes = async () => {
    setIsLoading(true);
    await fetchJokes();
    setIsLoading(false);
  };
  const fetchJokes = async () => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_X_RapidAPI_Key}`,
        "X-RapidAPI-Host": `${process.env.NEXT_PUBLIC_X_RapidAPI_Host}`,
      },
    };

    const response = await axios.request(options);
    if (response.status === 200) {
      let body = response.data.body;
      setJoke({
        setup: body.setup,
        image: body.image,
      });
    } else {
      setJoke({
        image: process.env.NEXT_PUBLIC_IMAGE_NOT_fOUND,
      });
    }

    console.log(response);
  };
  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Dad Joks</title>
        <meta name="description" content="Dad jokes" />
      </Head>

      <Row justify="center">
        <Col>
          <Title level={1}>Dad Jokes</Title>
        </Col>
      </Row>
      <Row
        justify="center"
        style={{
          height: "100vh",
          width: "100%",
        }}
        align="middle"
      >
        <Col>
          <div
            style={{
              width: "100%",
              marginBottom: "20px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
            <Image width={600} src={joke.image} loading={true} alt="dad joke" />
          </div>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            loading={isLoading}
            style={{
              float: "right",
            }}
            onClick={() => laodRandomDadJokes()}
          ></Button>
        </Col>
      </Row>
      <footer>
        <Row>
          <Col style={{ width: "100%" }}>
            <Card
              style={{
                textAlign: "center",
              }}
            >
              <p>Copyright@{date.getFullYear()}</p>
            </Card>
          </Col>
        </Row>
      </footer>
    </div>
  );
}

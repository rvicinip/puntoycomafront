import React from "react";

// react-bootstrap components
import {
Badge,
Button,
Card,
Form,
Media,
Navbar,
Nav,
Container,
Row,
Col,
} from "react-bootstrap";

function AgregarConsultor() {
return (
    <>
        <Container>
            <Card className="card-register card-plain text-center">
            <Card.Header>
                <Row className="justify-content-center">
                <Col md="8">
                    <div className="header-text">
                    <Card.Title as="h2">
                        Agregar Nuevo Consultor
                    </Card.Title>
                        <hr></hr>
                    </div>
                </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>

                    <Col className="mr-auto" md="5" lg="4">
                        <Form action="#" method="#">
                        <Card >
                            <div className="card-body">
                            <Form.Group>
                                <Form.Control
                                placeholder="Documento de Identidad"
                                type="text"
                                ></Form.Control>
                            </Form.Group> 
                            <Form.Group>
                                <Form.Control
                                placeholder="Nombre completo nuevo consultor"
                                type="text"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                placeholder="Correo Electrónico"
                                type="email"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                placeholder="Cargo"
                                type="text"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                placeholder="Tipo Contrato"
                                type="text"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                placeholder="Salario"
                                type="text"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                placeholder="Jornada"
                                type="text"
                                ></Form.Control>
                            </Form.Group>
                            </div>
                            <div className="card-footer text-center">
                            <Button
                                className="btn-fill btn-neutral btn-wd"
                                type="submit"
                                variant="default"
                            >Crear Consultor
                            </Button>
                            </div>
                        </Card>
                        </Form>
                    </Col>
                </Row>
            </Card.Body>
            </Card>
        </Container>
    </>
);
}

export default AgregarConsultor;



 


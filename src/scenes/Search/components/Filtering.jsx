import { h, Component } from "preact";
import Select from "react-select";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { Field, reduxForm, submit } from "redux-form";
import get from "lodash/get";
import groupBy from "lodash/groupBy";
import { connect } from "preact-redux";
import ViaCep from "react-via-cep";
import axios from "axios";
import { Formik } from "formik";
import v from "../../../variables";
import { Dialog } from "../../../toolbox/components";
import { Dropdown } from "../../../components";
import { Dropdown as MDDropdown } from "../../../toolbox/components";
import LocalDB from "../../../feathers/local-database";
import actions from "../redux/actions";
import Input from "../../Wizard/components/Input";


const { Cities, LawAreas } = LocalDB;
const Option = Select.Option;

/**
|--------------------------------------------------
| FooterButton
|--------------------------------------------------
*/

const FooterButton = styled.div`
  background-color: #7e57c2;
  text-align: center;
  height: 55px;
  width: 100%;
  bottom: 0;
  position: fixed;
  color: white;
  line-height: 55px;
  cursor: pointer;
  left: 0;
`;

/**
|--------------------------------------------------
| Title
|--------------------------------------------------
*/

const Title = styled.span`
  font-size: 13px;
`;

const mapStateToProps = ({ wizard, forms }) => ({
  initialValues: get(forms, "locationForm.values"),
  cities: Cities.find(),
  lawAreas: LawAreas.find({ $order: "name(asc)" }),
  getLawArea: LawAreas.get()
});

const mapDispatchToProps = {
  setLocation: actions.setLocation,
  setArea: actions.setArea,
  setLoading: actions.setLoading
};

const container = component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);

/**
|--------------------------------------------------
| FilteringWrapper
|--------------------------------------------------
*/

const FilteringWrapper = styled.div`
  font-size: 13px;
  background-color: #fff;
  margin-bottom: 5px;
  cursor: pointer;
`;

/**
|--------------------------------------------------
| Label
|--------------------------------------------------
*/

const Label = styled(Box)`
  flex: 1;
  justify-self: start;
  padding-left: 5px;
`;

/**
|--------------------------------------------------
| FilterItemWrapper
|--------------------------------------------------
*/

const FilterItemWrapper = styled.div`
  padding: 8px;
  border-top: 1px solid ${v.mc.grey._200};
`;

/**
|--------------------------------------------------
| FilterItem
|--------------------------------------------------
*/

const I = ({ name }) => (
  <i className="material-icons" style={{ fontSize: 15 }}>
    {name}
  </i>
);

const FilterItem = ({ icon, label, ...props }) => (
  <FilterItemWrapper {...props}>
    <Flex justify="space-between" align="center">
      <Box>
        {" "}
        <I name={icon} />{" "}
      </Box>
      <Label> {label}</Label>
      <Box>
        {" "}
        <I name="arrow_drop_down" />{" "}
      </Box>
    </Flex>
  </FilterItemWrapper>
);

/**
|--------------------------------------------------
| Change Location
|--------------------------------------------------
*/

class AreaForm extends Component {
  state = {
    lawArea: "",
    areas: [],
    loaded: false,
  };

  handleAreaChange = value => {
    this.setState({ lawArea: value });
  };

  load = lawAreas => {
    if (!this.state.loaded) {
      const areas = lawAreas.map(item => ({
        label: item.name,
        value: item._id
      }));
      this.setState({
        areas,
        loaded: true
      });
    }
  };

  render({ closeDialog, lawAreas, setArea, getLawArea }) {
    return (
      <form style={{ height: 345, overflowY: "scroll" }}>
        <If condition={lawAreas}>
          {this.load(lawAreas)}

          {this.state.areas.map(area => (
            <div
              style={{ padding: "15px 0px", cursor: "pointer" }}
              onClick={() => {
                const _area = getLawArea(area.value);
                setArea({ area: _area.name, id: _area._id });
                closeDialog();
              }}
            >
              <div>{area.label}</div>
            </div>
          ))}
        </If>
      </form>
    );
  }
}

const AreaFormContainer = container(AreaForm);

const SearchCepButton = styled.div`
  text-align: center;
  border: 1px solid #7d56c2;
  color: #7d56c2;
  border-radius: 3px;
  padding: 10px;
`;

const getAddressCoords = (addressObject, number) => {
  const { logradouro, localidade, uf } = addressObject;
  const address = `${logradouro} ${localidade} ${uf} ${number}`;
  return new Promise(resolve => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCmPKWxyysvnjzCJ5e9xE7H_8HNzWLtn4s`
      )
      .then(({ data }) => {
        console.log(data);
        if (data.results.length) {
          const [item] = data.results;
          const { lat, lng } = item.geometry.location;
          resolve([lat, lng]);
        }
        resolve([0, 0]);
      })
      .catch(err => {
        resolve([0, 0]);
      });
  });
};

const handleState = () => {
  this.setState({
    teste: true
  })
}

const Form = ({
  cities,
  initialValues,
  setLocation,
  closeDialog,
  onAddressUpdate
}) => (
  <div style={{ height: window.innerHeight - 100 }}>
    <Formik
      initialValues={{
        state: "",
        city: ""
      }}
      onSubmit={(values, actions) => {
        const location = {
          state: values.state.value,
          city: values.city.value,
          coords: [0, 0]
        };
        setLocation(location);
        closeDialog();
      }}
      render={({
        values,
        handleSubmit,
        setFieldValue,
        submitForm,
        setSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Select
            value={values.state}
            isSearchable={true}
            className="SelectInput"
            placeholder="Selecione seu Estado..."
            options={getStates(cities)}
            onChange={value => {
              setFieldValue("state", value);
              setSubmitting();
            }}
          />

          <Select
            value={values.city}
            isSearchable={true}
            className="SelectInput"
            placeholder="Selecione sua Cidade..."
            options={getCities(values.state.value, cities)}
            onChange={value => {
              setFieldValue("city", value);
              setSubmitting();
            }}
          />

          <div onClick={submitForm}>
            <FooterButton>
              <Title>ALTERAR</Title>
            </FooterButton>
          </div>
          <a href="javascript:void(0)" id="teste-mara" />

          <style jsx>{`
            .SelectInput {
              margin-bottom: 15px;
            }
            .SelectInput .css-vj8t7z {
              min-height: 50px !important;
              background-color: hsl(0, 0%, 90%) !important;
            }
            .SelectInput .css-d8oujb{
              display: none;
            }
          `}</style>
        </form>
      )}
    />

    {/* <ViaCep cep={get(initialValues, 'cep')} onSuccess={onAddressUpdate} lazy>
      {({ data, loading, error, fetch }) => {
        return (
          <div>

            <Field name="cep" label="CEP" component={Input} type="text" />
            <Field name="number" label="Número" component={Input} type="text" />
            <SearchCepButton onClick={fetch}>Pesquisar</SearchCepButton>

            <If condition={loading}>
              <p>procurando...</p>
            </If>

            <If condition={error && !data}>
              return <p>error</p>
            </If>

            <If condition={data && !loading}>
              <br/>
              <p style={{marginBottom: 50}} >{`${data.logradouro} ${data.localidade} ${data.uf}`}</p>

              <div onClick={() => {

                getAddressCoords(data, get(initialValues, 'number'))
                  .then(coords => {
                    const location = {
                      state: data.uf,
                      city: data.localidade,
                      coords
                    };
                    setLocation(location);
                    closeDialog();
                  })
              }} >
                <FooterButton>
                  <Title>ALTERAR</Title>
                </FooterButton>
              </div>

            </If>

          </div>
        )
      }}
    </ViaCep> */}
  </div>
);

const getStates = list =>
  list.map(({ nome, sigla }) => ({ label: nome, value: sigla }));

const getCities = (uf, list) => {
  if (!uf) return [];
  return list
    .find(i => i.sigla === uf)
    .cidades.map(cityName => ({ label: cityName, value: cityName }));
};

const ReduxedForm = reduxForm({
  form: "locationForm",
  destroyOnUnmount: false,
  enableReinitialize: true,
  pure: false,
  updateUnregisteredFields: true
})(Form);

const ContainerForm = container(ReduxedForm);

/**
|--------------------------------------------------
| Filtering
|--------------------------------------------------
*/

class Filtering extends Component {
  state = {
    active: false,
    areaDialog: false
  };

  handleLocationToggle = () => {
    this.setState({ active: !this.state.active });
  };

  handleAreaToggle = () => {
    this.setState({ areaDialog: !this.state.areaDialog });
  };

  render({ filters, search }) {
    return (
      <FilteringWrapper>
        <FilterItem
          icon="location_on"
          label={`${get(search, "location.city", "Todas as cidades")}, ${
            search.location.state
          }`}
          onClick={this.handleLocationToggle}
        />
        <FilterItem
          icon="work"
          id="work-select"
          label={search.area.area}
          onClick={this.handleAreaToggle}
        />

        <Dialog
          title="Alterar Cidade"
          active={this.state.active}
          onEscKeyDown={this.handleLocationToggle}
          onOverlayClick={this.handleLocationToggle}
        >
          <ContainerForm closeDialog={this.handleLocationToggle} />
        </Dialog>

        <Dialog
          title="Alterar Área"
          active={this.state.areaDialog}
          onEscKeyDown={this.handleAreaToggle}
          onOverlayClick={this.handleAreaToggle}
          style={{ height: 345 }}
        >
          <AreaFormContainer closeDialog={this.handleAreaToggle} />
        </Dialog>
      </FilteringWrapper>
    );
  }
}

export default Filtering;

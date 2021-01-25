// app level validation states since the individual items are separate
// to make the validation easier

const state = {
  invalidPersonalForm: null,
  invalidHealthForm: null,
  invalidEducationForm: null,
  invalidHouseholdForm: null,
  invalidGuardianForm: null
};

const getters = {
  getInvalidPersonalForm: state => state.invalidPersonalForm,
  getInvalidHealthForm: state => state.invalidHealthForm,
  getInvalidEducationForm: state => state.invalidEducationForm,
  getInvalidHouseholdForm: state => state.invalidHouseholdForm,
  getInvalidGuardianForm: state => state.invalidGuardianForm
};

const actions = {
  setInvalidPersonalForm({ commit }, status) {
    commit("SET_INVALID_PERSONAL_FORM", status);
  },
  setInvalidHealthForm({ commit }, status) {
    commit("SET_INVALID_HEALTH_FORM", status);
  },
  setInvalidEducationForm({ commit }, status) {
    commit("SET_INVALID_EDUCATION_FORM", status);
  },
  setInvalidHouseholdForm({ commit }, status) {
    commit("SET_INVALID_HOUSEHOLD_FORM", status);
  },
  setInvalidGuardianForm({ commit }, status) {
    commit("SET_INVALID_GUARDIAN_FORM", status);
  }
};

// vuex's term for setters AKA mutations
const mutations = {
  SET_INVALID_PERSONAL_FORM(state, status) {
    state.invalidPersonalForm = status;
  },
  SET_INVALID_HEALTH_FORM(state, status) {
    state.invalidHealthForm = status;
  },
  SET_INVALID_EDUCATION_FORM(state, status) {
    state.invalidEducationForm = status;
  },
  SET_INVALID_HOUSEHOLD_FORM(state, status) {
    state.invalidHouseholdForm = status;
  },
  SET_INVALID_GUARDIAN_FORM(state, status) {
    state.invalidGuardianForm = status;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

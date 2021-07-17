import store from '../store';
import axios from 'axios';
const saveIntoDb = (projectId, callback) => {
  axios
    .post('/api/project/thesis-research/update', {
      projectId: projectId,
      characteristics: JSON.stringify(store.state.research.characteristics),
      body: JSON.stringify(store.state.research.body),
      references: JSON.stringify(store.state.research.references),
      annexes: JSON.stringify(store.state.research.annexes),
      images: JSON.stringify(store.state.research.images),
      tables: JSON.stringify(store.state.research.tables),
      researchIndexes: JSON.stringify(store.state.research.researchIndexes),
    })
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      callback(error);
    });
};
export { saveIntoDb };

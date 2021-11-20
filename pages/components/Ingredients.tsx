import React from 'react';

import {
  Autocomplete,
  Chip,
  Container,
  TextField,
} from '@mui/material';

interface IngredientsProps {
  // ingredients saved by the user
  savedIngredients: string[];
  // Callback to set the ingredients list
  setIngredients: (newIngredients: string[]) => void;
}

// Component representing the container containing the ingredients
export default function Ingredients({
  savedIngredients,
  setIngredients,
}: IngredientsProps) {

  // Called when the saved ingredients change
  function onIngredientsChange(ev: React.SyntheticEvent, newIngredients: string[]) {
    setIngredients(newIngredients);
  }

  // Called when the specified ingredient is deleted
  function onIngredientDelete(ingredient: string) {
    // filter out all ingredients that aren't `ingredient`
    return () => setIngredients(savedIngredients.filter((ing) => ing !== ingredient));
  }

  return (
    <>
      <Container>
        <Autocomplete 
          multiple // allow multiple options
          freeSolo // allow any ingredient
          filterSelectedOptions
          options={autocompleteIngredients}
          value={savedIngredients}
          onChange={onIngredientsChange}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Ingredients" />
          )}
        />
      </Container>
      <Container>
        {savedIngredients.map((ing) => (
          <Chip key={ing} label={ing} onDelete={onIngredientDelete(ing)} />
        ))}
      </Container>
    </>
  );
}

const autocompleteIngredients = [
  "apples",
  "bananas",
  "carrots",
];
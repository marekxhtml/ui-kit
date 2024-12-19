import {css} from 'lit';

export default css`
  div {
    transition: background-color 0.3s;
    @apply rounded;
    @apply text-white;
  }

  div:hover {
    @apply bg-primary-dark;
  }
`;

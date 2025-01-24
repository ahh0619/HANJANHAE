'use client';

export default function Error({ error }) {
  return (
    <div>
      <h2>Something went wrong! {error.message}</h2>
    </div>
  );
}

cd circuits
snarkjs groth16 prove Location_0001.zkey Location_js/witness.wtns proof.json public.json
snarkjs groth16 verify verification_key.json public.json proof.json


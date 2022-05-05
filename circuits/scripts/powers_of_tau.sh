cd circuits
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
snarkjs groth16 setup Location.r1cs pot12_final.ptau Location_0000.zkey
snarkjs zkey contribute Location_0000.zkey Location_0001.zkey --name="1st Contributor Name" -v
snarkjs zkey export verificationkey Location_0001.zkey verification_key.json




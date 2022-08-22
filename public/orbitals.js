function drawOrbitals(parentAngle, _center, _rad, _n) {
    if (_n <= 0) return;
    var currAngle = radialSymmetry ? parentAngle : startingAngles[_n - 1];
    var rotationRadians = (PI * 2) / orbitals[_n - 1];

    for (let o = 0; o < orbitals[_n - 1]; o++) {
        let ox = _center[0] + _rad * cos(currAngle);
        let oy = _center[1] + _rad * sin(currAngle);
        let orad = _rad * scalars[_n - 1]
        let gIdx = _n % 2 == 1 ? gradientFlipIndex : 1;
        let newCenter = [ox, oy];
        if (!FILO) drawSingleOrbital(orad, newCenter, gIdx);
        drawOrbitals(currAngle, newCenter, orad, _n - 1);
        if (FILO) drawSingleOrbital(orad, newCenter, gIdx);
        currAngle += rotationRadians;
    }
}
function drawSingleOrbital(orad, _center, _gIdx) {
    let [ox, oy] = _center;
    if (orad < 20) {
        noStroke();
        fill(gradients[_gIdx].get(ox, oy));
        circle(ox, oy, orad)
    } else {
        let omask = getMask(DIM);
        omask.circle(ox, oy, orad);
        applyMask(gradients[_gIdx], omask);
    }
}
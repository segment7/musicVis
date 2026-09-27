/* Start of my own code */
class Noise {
    constructor() {
        //name of the visualisation
        this.name = "noise";
        this.noisePoint = 0.007;
        this.noiseSpeed = 0;
    }

    draw() {
        push();

        //set color mode to HSB
        colorMode(HSB);

        //analyze frequency spectrum for getEnergy
        fourier.analyze();
        const bass = fourier.getEnergy("bass");
        const lowMid = fourier.getEnergy("lowMid");
        const highMid = fourier.getEnergy("highMid");
        const treble = fourier.getEnergy("treble");

        background(0);
        noStroke();

        //use peak energy to control density and hue
        const maxEnergy = max(bass, lowMid, highMid, treble);
        const energyNorm = constrain(maxEnergy / 255, 0, 1);        
        const hue = map(pow(energyNorm, 3.7), 0.3, 1, 150, 360);
        const dynamicsPics = map(pow(energyNorm, 3.7), 0, 1, 0.0007, 0.7);

        //use weighted energy distribution to control noise speed
        const rhythm = (bass * 0.5 + lowMid * 0.4 + highMid * 0.3 + treble * 0.3) / 255; 
        const speedBoost = map(pow(rhythm, 3.7), 0, 1, 0, 0.032); 
        this.noiseSpeed += (0.00007 + speedBoost);

        //draw a circle that holds noise.
        const centerX = width / 2;
        const centerY = height / 2;
        const r = 350;
        const step = 4;
        const dynamicsN = 120;
        const r2 = r * r;

        for(let y = centerY - r; y <= centerY + r; y += step){
            let dy2 = (y - centerY) * (y - centerY);

            for(let x = centerX - r; x <= centerX + r; x += step){
                let dx = x - centerX;

                if(dx * dx + dy2 <= r2){
                    const nx = x * this.noisePoint;
                    const ny = y * this.noisePoint;
                    const nt = this.noiseSpeed;

                    const noiseVal = noise(nx, ny, nt);

                    const pn = pow(noiseVal, 6);

                    if((dynamicsN * pn) % 1 < dynamicsPics){
                        const Hue = hue + map(dx, -r, r, -20, 20);
                        stroke(Hue, 57, 100);
                        strokeWeight(step * 0.6);
                        point(x, y);
                    }
                }
            }
        }
    
        pop();
    }
}
/* End of my own code */
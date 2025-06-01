import { QuantumState } from '../../types/quantum';

// Import GPUBufferUsage and GPUMapMode from quantum-optimizer if not already present
const GPUBufferUsage = {
  STORAGE: 0x0080,
  COPY_SRC: 0x0002,
  COPY_DST: 0x0004,
  MAP_READ: 0x0001
};
const GPUMapMode = {
  READ: 0x0001,
  WRITE: 0x0002
};

export class GPUAccelerator {
  private device: GPUDevice | null = null;
  private computePipeline: GPUComputePipeline | null = null;

  async initialize(): Promise<void> {
    try {
      if (!navigator.gpu) {
        console.warn('WebGPU not supported - falling back to CPU processing');
        return;
      }

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        throw new Error('No GPU adapter found');
      }

      this.device = await adapter.requestDevice();
      await this.setupComputePipeline();
    } catch (error) {
      console.error('GPU initialization failed:', error);
    }
  }

  private async setupComputePipeline(): Promise<void> {
    if (!this.device) return;

    const shaderModule = this.device.createShaderModule({
      code: `
        struct QuantumState {
          coherence: f32,
          entanglement: f32,
          superposition: f32,
          phase: f32,
          dimensionalResonance: f32,
        };

        @group(0) @binding(0) var<storage, read> inputStates: array<QuantumState>;
        @group(0) @binding(1) var<storage, write> outputStates: array<QuantumState>;

        @compute @workgroup_size(64)
        fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
          let index = global_id.x;
          if (index >= arrayLength(&inputStates)) {
            return;
          }

          var state = inputStates[index];
          
          // Quantum state evolution calculations
          state.coherence = state.coherence * 0.98 + sin(state.phase) * 0.02;
          state.entanglement = min(state.entanglement * 1.01, 1.0);
          state.superposition = state.superposition * cos(state.phase);
          state.phase = (state.phase + 0.01) % 6.28318;
          state.dimensionalResonance = state.dimensionalResonance * 
            (1.0 + state.coherence * 0.1);

          outputStates[index] = state;
        }
      `
    });

    this.computePipeline = await this.device.createComputePipelineAsync({
      layout: 'auto',
      compute: {
        module: shaderModule,
        entryPoint: 'main',
      },
    });
  }

  async compute(states: QuantumState[]): Promise<QuantumState[]> {
    if (!this.device || !this.computePipeline) {
      // Fallback to CPU processing
      return this.computeCPU(states);
    }

    const inputBuffer = this.device.createBuffer({
      size: states.length * Float32Array.BYTES_PER_ELEMENT * 5,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const outputBuffer = this.device.createBuffer({
      size: states.length * Float32Array.BYTES_PER_ELEMENT * 5,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
    });

    const stagingBuffer = this.device.createBuffer({
      size: states.length * Float32Array.BYTES_PER_ELEMENT * 5,
      usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    });

    // Create bind group
    const bindGroup = this.device.createBindGroup({
      layout: this.computePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: inputBuffer } },
        { binding: 1, resource: { buffer: outputBuffer } },
      ],
    });

    // Write data to input buffer
    this.device.queue.writeBuffer(
      inputBuffer,
      0,
      this.quantumStatesToFloat32Array(states)
    );

    // Create command encoder
    const commandEncoder = this.device.createCommandEncoder();
    const computePass = commandEncoder.beginComputePass();
    computePass.setPipeline(this.computePipeline);
    computePass.setBindGroup(0, bindGroup);
    computePass.dispatchWorkgroups(Math.ceil(states.length / 64));
    computePass.end();

    // Copy output to staging buffer
    commandEncoder.copyBufferToBuffer(
      outputBuffer,
      0,
      stagingBuffer,
      0,
      states.length * Float32Array.BYTES_PER_ELEMENT * 5
    );

    // Submit commands
    this.device.queue.submit([commandEncoder.finish()]);

    // Read results
    await stagingBuffer.mapAsync(GPUMapMode.READ);
    const results = new Float32Array(stagingBuffer.getMappedRange());
    const processedStates = this.float32ArrayToQuantumStates(results);
    stagingBuffer.unmap();

    return processedStates;
  }

  private computeCPU(states: QuantumState[]): QuantumState[] {
    return states.map(state => ({
      ...state,
      coherence: state.coherence * 0.98 + Math.sin(state.phase) * 0.02,
      entanglement: Math.min(state.entanglement * 1.01, 1),
      superposition: state.superposition * Math.cos(state.phase),
      phase: (state.phase + 0.01) % (Math.PI * 2),
      dimensionalResonance: state.dimensionalResonance * (1 + state.coherence * 0.1)
    }));
  }

  private quantumStatesToFloat32Array(states: QuantumState[]): Float32Array {
    const array = new Float32Array(states.length * 5);
    states.forEach((state, i) => {
      const offset = i * 5;
      array[offset] = state.coherence;
      array[offset + 1] = state.entanglement;
      array[offset + 2] = state.superposition;
      array[offset + 3] = state.phase;
      array[offset + 4] = state.dimensionalResonance;
    });
    return array;
  }

  private float32ArrayToQuantumStates(array: Float32Array): QuantumState[] {
    const states: QuantumState[] = [];
    for (let i = 0; i < array.length; i += 5) {
      states.push({
        coherence: array[i],
        entanglement: array[i + 1],
        superposition: array[i + 2],
        phase: array[i + 3],
        dimensionalResonance: array[i + 4],
      });
    }
    return states;
  }
}

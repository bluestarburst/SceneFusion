# SceneFusion
A new attempt of creating a consistent scene using [AnimateDiff](https://animatediff.github.io/)'s video diffusion model. This project is inspired by both [AnimateDiff](https://animatediff.github.io/)'s capabilities and recent gaussian splatting implementations such as [DreamGaussian](https://dreamgaussian.github.io/). 

https://github.com/BlueStarBurst/SceneFusion/docs/src/Resources/sample-17.gif

# Goal
The goal of this project is to create customizable priors (see [MVDream](https://mv-dream.github.io/)) for 3D generation from a text prompt. 

# Front-End Editing Tutorial

The website is also publicly available [here](https://bluestarburst.github.io/SceneFusion/) 

How to build the website from source:

1. Download NPM [here](https://nodejs.org/en/download)
2. Download git [here](https://github.com/git-guides/install-git)
3. Clone the repo using "git clone [https://github.com/BlueStarBurst/SceneFusion.git](https://github.com/BlueStarBurst/SceneFusion.git)" in the IDE terminal
4. Run the command "npm install" in the IDE terminal
5. Wait for it to download dependencies
6. Run the command "npm run start"
7. Start editing files in the src folder and the localhost will show updated website in real-time

# Acknowledgements

@article{guo2023animatediff,
  title={AnimateDiff: Animate Your Personalized Text-to-Image Diffusion Models without Specific Tuning},
  author={Guo, Yuwei and Yang, Ceyuan and Rao, Anyi and Wang, Yaohui and Qiao, Yu and Lin, Dahua and Dai, Bo},
  journal={arXiv preprint arXiv:2307.04725},
  year={2023}
}

@article{guo2023sparsectrl,
  title={SparseCtrl: Adding Sparse Controls to Text-to-Video Diffusion Models},
  author={Guo, Yuwei and Yang, Ceyuan and Rao, Anyi and Agrawala, Maneesh and Lin, Dahua and Dai, Bo},
  journal={arXiv preprint arXiv:2311.16933},
  year={2023}
}

@article{tang2023dreamgaussian,
  title={DreamGaussian: Generative Gaussian Splatting for Efficient 3D Content Creation},
  author={Tang, Jiaxiang and Ren, Jiawei and Zhou, Hang and Liu, Ziwei and Zeng, Gang},
  journal={arXiv preprint arXiv:2309.16653},
  year={2023}
}

@article{shi2023MVDream,
  author = {Shi, Yichun and Wang, Peng and Ye, Jianglong and Mai, Long and Li, Kejie and Yang, Xiao},
  title = {MVDream: Multi-view Diffusion for 3D Generation},
  journal = {arXiv:2308.16512},
  year = {2023},
}
